import styled from "styled-components";
import {
  Alert,
  Container,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import StyledSelectField from "../../../ui/styledSelectField";
import StyledCheckButton from "../../../ui/styledCheckButton";
import StyledSwitch from "../../../ui/styledSwitch";
import StyledButton from "../../../ui/styledButton";
import FileUpload from "../../../utils/FileUpload";
import { ReactComponent as ClockOutline } from "../../../assets/icons/ClockOutline.svg";
import { ReactComponent as Calendar } from "../../../assets/icons/calendar.svg";
import { ReactComponent as Phone } from "../../../assets/icons/Phone.svg";
import { ReactComponent as SMS } from "../../../assets/icons/sms.svg";
import { useForm, Controller } from "react-hook-form";
import StyledInput from "../../../ui/styledInput";
import CalendarInput from "../../../ui/CalendarInput";
import { categoryDropdownData, vendorDropdownData } from "../../../assets/json/chargestations";
import {
  getCountries,
  getStatesOfCountry,
  getCitiesOfState,
} from "@countrystatecity/countries-browser";
import { useCreateChargingStation, useEditChargingStation } from "../../../hooks/mutations/useChargingStationMutation";
import { useImageUpload } from "../../../hooks/mutations/useImageUpload";

const toOptions = (items = []) =>
  items.map((item) => ({ label: item.name, value: item }));

const AddChargingStation = ({ data = {}, formSubmited, editStatus = false, ...props }) => {
  const [amenities, setAmenities] = useState(editStatus ? data['amenities'] : []);
  const [image, setImage] = useState();

  // Use mutation hooks
  const createChargingStationMutation = useCreateChargingStation();
  const editChargingStationMutation = useEditChargingStation();
  const imageUploadMutation = useImageUpload();

  // address data country state city (lazy-loaded from CDN)
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const [countryCode, setCountryCode] = useState(editStatus ? data["country"] : '')
  const [stateCode, setStateCode] = useState(editStatus ? data["state"] : '')

  useEffect(() => {
    let cancelled = false;

    const loadLocationData = async () => {
      try {
        setLoadingCountries(true);
        const countryList = await getCountries();
        if (cancelled) return;
        setCountries(toOptions(countryList));

        if (editStatus && data.country) {
          try {
            setLoadingStates(true);
            const stateList = await getStatesOfCountry(data.country);
            if (cancelled) return;
            setStates(toOptions(stateList));

            if (data.state) {
              setLoadingCities(true);
              const cityList = await getCitiesOfState(data.country, data.state);
              if (cancelled) return;
              setCities(toOptions(cityList));
            }
          } finally {
            if (!cancelled) {
              setLoadingStates(false);
              setLoadingCities(false);
            }
          }
        }
      } catch (error) {
        console.error("Failed to load country/state/city data:", error);
        toast.error("Failed to load location options");
      } finally {
        if (!cancelled) setLoadingCountries(false);
      }
    };

    loadLocationData();
    return () => {
      cancelled = true;
    };
  }, [editStatus, data.country, data.state]);
  const getCheckButtonData = (checkBtndata) => {
    if (checkBtndata.active == true) {
      setAmenities([...amenities, checkBtndata.value]);
    } else {
      setAmenities(amenities.filter((item) => item !== checkBtndata.value));
    }
  };
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: {
      staff: editStatus && data['staff'], // Set the default value for "activate"
      name: editStatus ? data['Charge Station'] : '',
      address: editStatus ? data['Address'].split(', ')[0] : '',
      country: editStatus ? data['Address'].split(', ')[data['Address'].split(', ').length - 2] : '',
      state: editStatus ? data['Address'].split(', ')[data['Address'].split(', ').length - 3] : '',
      city: editStatus ? data['Address'].split(', ')[data['Address'].split(', ').length - 4] : '',
      pincode: editStatus ? data['Address'].split(', ')[data['Address'].split(', ').length -1] : '',
      latitude: editStatus ? data['Latitude'] : '',
      longitude: editStatus ? data['Longitude'] : '',
      commissionedDate: editStatus ? data['commissioned_on'] : '',
      startTime: editStatus ? data['startTime'] : '',
      endTime: editStatus ? data['stopTime'] : '',
      owner: editStatus ? data['Owner'] : '',
      ownerPhone: editStatus ? data['owner_phone'] : '',
      ownerEmailId: editStatus ? data['owner_email'] : '',
      lspName: editStatus ? data['location_support_name'] : '',
      lpsPhoneNumber: editStatus ? data['location_support__phone'] : '',
      lpsemailId: editStatus ? data['location_support_email'] : '',
      vendor: editStatus ? data['vendor'] : '',
      category: editStatus ? data['category'] : '',
      stationRefId: editStatus ? data['station_ref_id'] : '',
    },
  });
  const onSubmit = (values) => {
    // Handle form submission with data
    
    if (editStatus) {
      updateChargingStation(values)
    } else {
      addChargingStation(values)
    }
  };

  const addChargingStation = (values) => {
    if (image) {
      imageUploadMutation.mutate(image, {
        onSuccess: (res) => {
          if (res.status) {
            let dt = {
              amenities: amenities,
              name: values.name,
              address: `${values.address}, ${values.city.value.name}, ${values.state.value.name}, ${values.country.value.name}, ${values.pincode}`,
              country: countryCode,
              state: stateCode,
              owner: values.owner,
              owner_email: values.ownerEmailId,
              owner_phone: values.ownerPhone,
              location_support_name: values.lspName,
              location_support_email: values.lpsemailId,
              location_support__phone: values.lpsPhoneNumber,
              latitude: values.latitude,
              longitude: values.longitude,
              commissioned_on: values.commissionedDate,
              image: res.url,
              startTime: values.startTime,
              stopTime: values.endTime,
              staff: values.staff,
              vendor: values.vendor.value,
              category: values.category.value,
              station_ref_id: values.stationRefId,
            }
            createChargingStationMutation.mutate(dt, {
              onSuccess: (res) => {
                if (res.status) {
                  localStorage.setItem('token', res.token);
                  toast.success("Charging Station created successfully")
                  reset();
                  formSubmited();
                } else {
                  toast.error(`${res.message}`);
                  reset();
                }
              },
              onError: (error) => {
                toast.error(error?.response?.data?.error || "Failed to create charging station");
                reset();
              }
            });
          }
        },
        onError: (error) => {
          toast.error("Failed to upload image");
        }
      });
    } else {
      let dt = {
        amenities: amenities,
        name: values.name,
        address: `${values.address}, ${values.city.value.name}, ${values.state.value.name}, ${values.country.value.name}, ${values.pincode}`,
        country: countryCode,
        state: stateCode,
        owner: values.owner,
        owner_email: values.ownerEmailId,
        owner_phone: values.ownerPhone,
        location_support_name: values.lspName,
        location_support_email: values.lpsemailId,
        location_support__phone: values.lpsPhoneNumber,
        latitude: values.latitude,
        longitude: values.longitude,
        commissioned_on: values.commissionedDate,
        startTime: values.startTime,
        stopTime: values.endTime,
        staff: values.staff,
        vendor: values.vendor.value,
        category: values.category.value,
        station_ref_id: values.stationRefId,
      }
      createChargingStationMutation.mutate(dt, {
        onSuccess: (res) => {
          if (res.status) {
            localStorage.setItem('token', res.token);
            toast.success("Charging Station created successfully")
            reset();
            formSubmited();
          } else {
            toast.error(`${res.message}`);
            reset();
          }
        },
        onError: (error) => {
          toast.error(error?.response?.data?.error || "Failed to create charging station");
          reset();
        }
      });
    }
  }


  const updateChargingStation = (values) => {
    let dt = {
      amenities: amenities,
      name: values.name,
      address: `${values.address}, ${values.city.value ? values.city.value.name : data['Address'].split(', ')[1]}, ${values.state.value ? values.state.value.name : data['Address'].split(', ')[2]}, ${values.country.value ? values.country.value.name : data['Address'].split(', ')[3]}, ${values.pincode}`,
      country: countryCode,
      state: stateCode,
      owner: values.owner,
      owner_email: values.ownerEmailId,
      owner_phone: values.ownerPhone,
      location_support_name: values.lspName,
      location_support_email: values.lpsemailId,
      location_support__phone: values.lpsPhoneNumber,
      latitude: values.latitude,
      longitude: values.longitude,
      commissioned_on: values.commissionedDate,
      startTime: values.startTime,
      stopTime: values.endTime,
      staff: values.staff,
      vendor: values.vendor.value ? values.vendor.value : data['vendor'],
      category: values.category.value ? values.category.value : data['category'],
      station_ref_id: values.stationRefId,
    }
    if (image) {
      imageUploadMutation.mutate(image, {
        onSuccess: (res) => {
          if (res.status) {
            editChargingStationMutation.mutate(
              { id: data['_id'], data: { ...dt, image: res.url } },
              {
                onSuccess: (res) => {
                  toast.success("Charging Station updated successfully");
                  formSubmited();
                },
                onError: (error) => {
                  toast.error(error?.response?.data?.error || "Failed to update charging station");
                }
              }
            );
          }
        },
        onError: (error) => {
          toast.error("Failed to upload image");
        }
      });
    } else {
      editChargingStationMutation.mutate(
        { id: data['_id'], data: { ...dt, image: data['image'] } },
        {
          onSuccess: (res) => {
            toast.success("Charging Station updated successfully");
            reset();
            formSubmited();
          },
          onError: (error) => {
            toast.error(error?.response?.data?.error || "Failed to update charging station");
          }
        }
      );
    }
  }

  const handleChange = (event) => {
    setValue("staff", event.target.checked);
  };


  const fileSelectHandle = (files) => {
    setImage(files.files[0])
  }

  const handleDateChangeInParent = (date) => {
    setValue('commissionedDate', date); // Assuming you have 'expiryDate' in your form state
    clearErrors('commissionedDate');
  };



  let AmenitiesData = [
    "Mall",
    "Cafe",
    "Restaurant",
    "Restroom",
    "Waitingroom",
    "Bar",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="md" sx={{ p: 2, backgroundColor: 'primary.main' }}>
        <Grid container sx={{ alignItems: "center" }} spacing={2}>
          <Grid item xs={12} md={8}>
            <Stack direction="column">
              <Typography sx={{ marginBottom: 3, marginTop: 3, color: 'primary.contrastText' }}>
                Location name
              </Typography>

              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledInput {...field} placeholder="Enter Location Name" />
                    {errors.name && (
                      <span style={errorMessageStyle}>
                        {errors.name.message}
                      </span>
                    )}
                  </>
                )}
                rules={{ required: "Location Name is required" }}
              />

              <Typography sx={{ marginBottom: 1, marginTop: 3, color: 'primary.contrastText' }}>
                Station Ref ID
              </Typography>
              <Controller
                name="stationRefId"
                control={control}
                render={({ field }) => (
                  <StyledInput {...field} placeholder="Enter Station Ref ID" />
                )}
              />

              {/* <InputField placeholder={"Enter Location Name"} /> */}
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <FileUpload onFileSelect={fileSelectHandle} image={editStatus && `${data['image']}`} />
          </Grid>
        </Grid>

        {/* ----address */}
        <Typography sx={{ marginBottom: 3, marginTop: 3, color: 'primary.contrastText' }}>Address</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Stack direction="column">
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledInput {...field} placeholder={"Enter Address"} />
                    {errors.address && (
                      <span style={errorMessageStyle}>
                        {errors.address.message}
                      </span>
                    )}
                  </>
                )}
                rules={{ required: "Address is required" }}
              />
            </Stack>
          </Grid>

          <Grid item xs={6} md={4}>
            <Controller
              name="pincode"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput {...field} placeholder="Pincode" type="number" />
                  {errors.pincode && (
                    <span style={errorMessageStyle}>
                      {errors.pincode.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "pincode is required" }}
            />
          </Grid>

          <Grid item xs={6} md={4}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    {...field}
                    placeholder="Country"
                    options={countries}
                    isLoading={loadingCountries}
                    onChange={async (e) => {
                      setValue("country", e);
                      setValue("state", "");
                      setValue("city", "");
                      setCities([]);
                      setStates([]);
                      setStateCode("");
                      const code = e.value.iso2;
                      setCountryCode(code);
                      try {
                        setLoadingStates(true);
                        const stateList = await getStatesOfCountry(code);
                        setStates(toOptions(stateList));
                      } catch (error) {
                        console.error("Failed to load states:", error);
                        toast.error("Failed to load states");
                        setStates([]);
                      } finally {
                        setLoadingStates(false);
                      }
                    }}
                    isSearchable={true}
                  />
                  {errors.country && (
                    <span style={errorMessageStyle}>
                      {errors.country.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Country is required" }}
            />
          </Grid>

          <Grid item xs={6} md={4}>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    {...field}
                    placeholder="State"
                    options={states}
                    isLoading={loadingStates}
                    onChange={async (e) => {
                      setValue("state", e);
                      setValue("city", "");
                      setCities([]);
                      const code = e.value.iso2;
                      setStateCode(code);
                      try {
                        setLoadingCities(true);
                        const cityList = await getCitiesOfState(countryCode, code);
                        setCities(toOptions(cityList));
                      } catch (error) {
                        console.error("Failed to load cities:", error);
                        toast.error("Failed to load cities");
                        setCities([]);
                      } finally {
                        setLoadingCities(false);
                      }
                    }}
                    isSearchable={true}
                  />
                  {errors.state && (
                    <span style={errorMessageStyle}>
                      {errors.state.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "State is required" }}
            />
          </Grid>

          <Grid item xs={6} md={4}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    {...field}
                    placeholder="City"
                    options={cities}
                    isLoading={loadingCities}
                    isSearchable
                  />
                  {errors.city && (
                    <span style={errorMessageStyle}>{errors.city.message}</span>
                  )}
                </>
              )}
              rules={{ required: "City is required" }}
            />
          </Grid>
        </Grid>

        {/* ----Map co-ordinates*/}

        <Typography sx={{ marginBottom: 3, marginTop: 3, color: 'primary.contrastText' }}>
          Map co-ordinates
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Stack direction="column">
              <Controller
                name="longitude"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledInput {...field} placeholder="Longitude" type="number" />
                    {errors.longitude && (
                      <span style={errorMessageStyle}>
                        {errors.longitude.message}
                      </span>
                    )}
                  </>
                )}
                rules={{ required: "longitude is required",
                max:{value:180,message: "must be less than 180"},
                min:{value:-180,message: "must be greater than -180"}}}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              name="latitude"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput {...field} placeholder="Latitude" type="number" />
                  {errors.latitude && (
                    <span style={errorMessageStyle}>
                      {errors.latitude.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Latitude is required",
                max:{value:90,message: "must be less than 90"},
                min:{value:-90,message: "must be greater than -90"}}}
            />
          </Grid>
        </Grid>

        <Typography sx={{ marginBottom: 3, marginTop: 3, color: 'primary.contrastText' }}>
          Operating hours
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Stack direction="column">
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledInput
                      {...field}
                      type="time"
                      icon={<ClockOutline />}
                      placeholder={"Start time"}

                    />
                    {errors.startTime && (
                      <span style={errorMessageStyle}>
                        {errors.startTime.message}
                      </span>
                    )}
                  </>
                )}
                rules={{ required: "Start time is required" }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              name="endTime"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput
                    {...field}
                    type="time"
                    icon={<ClockOutline />}
                    placeholder={"End time"}
                  />
                  {errors.endTime && (
                    <span style={errorMessageStyle}>
                      {errors.endTime.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "End time is required" }}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Controller
              name="commissionedDate"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput
                    {...field}
                    placeholder="Commissioned Date"
                    icon={<Calendar />}
                    iconright={<CalendarInput onDateChange={handleDateChangeInParent} />}
                    readOnly

                  />
                  {errors.commissionedDate && (
                    <span style={errorMessageStyle}>
                      {errors.commissionedDate.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Commissioned Date is required" }}
            />
          </Grid>
        </Grid>

        <Typography sx={{ marginBottom: 3, marginTop: 3, color: 'primary.contrastText' }}>
          Location Support
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Controller
              name="lspName"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput
                    {...field}
                    placeholder={"Enter Location Support personal's name"}
                  />
                  {errors.lspName && (
                    <span style={errorMessageStyle}>
                      {errors.lspName.message}
                    </span>
                  )}
                </>
              )}
              rules={{
                required: "Location Support personal's name is required",
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack direction="column">
              <Controller
                name="lpsPhoneNumber"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledInput
                      {...field}
                      icon={<Phone />}
                      placeholder={"Enter Phone number"}
                      type="number"
                    />
                    {errors.lpsPhoneNumber && (
                      <span style={errorMessageStyle}>
                        {errors.lpsPhoneNumber.message}
                      </span>
                    )}
                  </>
                )}
                rules={{ required: "Phone number is required" }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="lpsemailId"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput
                    {...field}
                    icon={<SMS />}
                    placeholder={"Enter Email ID"}
                  />
                  {errors.lpsemailId && (
                    <span style={errorMessageStyle}>
                      {errors.lpsemailId.message}
                    </span>
                  )}
                </>
              )}
              rules={{
                required: "Email ID is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address"
                }
              }}
            />
          </Grid>
        </Grid>

        <Typography sx={{ marginBottom: 3, marginTop: 3, color: 'primary.contrastText' }}>
          Amenities
        </Typography>
        <Grid container spacing={2}>
          {AmenitiesData.map((Amenity) => {
            return (
              <Grid key={Amenity} item xs={6} md={3}>
                <StyledCheckButton
                  checkButtonChange={getCheckButtonData}
                  color="gray"
                  actived={editStatus && data['amenities'].includes(Amenity)}
                >
                  {Amenity}
                </StyledCheckButton>
              </Grid>
            );
          })}
        </Grid>

        <Typography sx={{ marginBottom: 3, marginTop: 3, color: 'primary.contrastText' }}>
          Business name
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Controller
              name="owner"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput {...field} placeholder={"enter Business name"} />
                  {errors.owner && (
                    <span style={errorMessageStyle}>
                      {errors.owner.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Business name is required" }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack direction="column">
              <Controller
                name="ownerPhone"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledInput
                      {...field}
                      icon={<Phone />}
                      placeholder={"Enter Phone number"}
                      type="number"
                    />
                    {errors.ownerPhone && (
                      <span style={errorMessageStyle}>
                        {errors.ownerPhone.message}
                      </span>
                    )}
                  </>
                )}
                rules={{ required: "Phone number is required" }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="ownerEmailId"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput
                    {...field}
                    icon={<SMS />}
                    placeholder={"Enter Email ID"}
                  />
                  {errors.ownerEmailId && (
                    <span style={errorMessageStyle}>
                      {errors.ownerEmailId.message}
                    </span>
                  )}
                </>
              )}
              rules={{
                required: "Email ID is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address"
                }
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid sx={{ marginBottom: 1, marginTop: 3 }} item xs={12} md={12}>
            <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
              <Typography sx={{ color: 'primary.contrastText' }}>Staff</Typography>
              <Controller
                name="staff"
                control={control}
                render={({ field }) => (
                  <StyledSwitch
                    {...field}
                    onChange={(e) => {
                      handleChange(e);
                      // Additional logic if needed
                    }}
                    defaultChecked={field.value}
                  // Adding 'required' attribute
                  />
                )}
              />
            </Stack>
          </Grid>
        </Grid>
        <Typography sx={{ marginBottom: 3, marginTop: 3, color: 'primary.contrastText' }}>Vendor</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Controller
              name="vendor"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField {...field} placeholder="Select Vendor" options={vendorDropdownData} />
                  {errors.vendor && (
                    <span style={errorMessageStyle}>
                      {errors.vendor.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Vendor is required" }}
            />
          </Grid>
        </Grid>

        <Typography sx={{ marginBottom: 3, marginTop: 3, color: 'primary.contrastText' }}>Category</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField {...field} placeholder="Select category" options={categoryDropdownData} />
                  {errors.category && (
                    <span style={errorMessageStyle}>
                      {errors.category.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Category is required" }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Stack
              item
              xs={12}
              md={12}
              direction={"row"}
              spacing={2}
              sx={{ mt: 2 }}
            >
              <StyledButton variant={"primary"} width="200" type="submit">
                {" "}
                Save{" "}
              </StyledButton>

              <StyledButton variant={"secondary"} width="160" >
                {" "}
                Cancel{" "}
              </StyledButton>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};

export default AddChargingStation;

//! STYLINGS

// Styled action cell

// Styled table container
export const TableContainer = styled.div`
  background: #27292f; // Dark background for the table
  overflow-x: auto; // Allows table to be scrollable horizontally
  border-radius: 8px; // Rounded corners
  margin: 20px 0; // Margin for spacing, adjust as needed
`;

const errorMessageStyle = {
  color: "red",
  // margin: '1px 0',
};
