import React from "react";
import { Box, Grid, Pagination, PaginationItem, Stack, Typography } from "@mui/material";
import { ReactComponent as ReloadIcon } from "../../../assets/icons/reload.svg";
import { Star, DeleteOutline, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import LastSynced from "../../../layout/LastSynced";
import { useParams } from "react-router-dom";
import { useUserReviews } from "../../../hooks/queries/useReview";

const ReviewComponent = ({ data }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < data.rating) {
        stars.push(<Star key={i} fontSize="14px" sx={{ color: "#F2C94C" }} />);
      } else {
        stars.push(<Star key={i} fontSize="14px" />);
      }
    }
    return stars;
  };
  return (
    <Box sx={{ p: 1 }}>
      <Stack direction={"column"} spacing={1}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Typography color={"primary.contrastText"}>{data.username}</Typography>
            <Stack direction={"row"}>{renderStars()}</Stack>
          </Stack>
          <DeleteOutline
            sx={{ cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: "22px" }}
          />
        </Stack>
        <Typography variant="subtitle2" sx={{ fontWeight: 300, color: "secondary.contrastText" }}>
          {data.comment}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ color: "rgba(255, 255, 255, 0.50)", fontSize: "12px", fontWeight: 300 }}
        >
          {data.createdAt}
        </Typography>
      </Stack>
    </Box>
  );
};

export default function UserReview() {
  const { id } = useParams();

  // TanStack Query hook
  const { data: reviewsData, refetch } = useUserReviews(id);

  // Extract data with safe defaults
  const reviews = reviewsData?.result || [];

  return (
    <>
      <LastSynced heading={"Reviews"} reloadHandle={refetch} />
      <Box
        sx={{
          backgroundColor: "#1D1B20",
          /*maxHeight: {xs:'1000px',md:'500px'},*/ borderRadius: "4px",
          m: { xs: 1, md: 4 },
          p: 2,
        }}
      >
        {reviews.length <= 0 && (
          <Typography variant="body1" sx={{ color: "secondary.contrastText", textAlign: "center", margin: "20px" }}>
            No reviews
          </Typography>
        )}
        <Grid container spacing={{ xs: 1, md: 3 }}>
          {reviews?.map((item) => (
            <Grid item XS={12} md={4}>
              <ReviewComponent data={item} />
            </Grid>
          ))}
        </Grid>
        <Box p={2} sx={{ display: "flex", justifyContent: "center" }}>
          {reviews.length > 0 && (
            <Pagination
              sx={{ color: "#fff" }}
              count={reviews.length}
              size="small"
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIos,
                    next: ArrowForwardIos,
                  }}
                  {...item}
                  sx={{ backgroundColor: "secondary.button", color: "#fff" }}
                />
              )}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
