import { Typography } from "@mui/material";
import React from "react";
import StyledDivider from "../../ui/StyledDivider";

function About() {
  return (
    <>
      <div className="mx-5 my-10 flex flex-col gap-5 bg-[#1c1d22] px-10 py-10">
        <Typography sx={{ color: "secondary.contrastText", fontWeight: "600", fontSize:"16px" }}>
          About the company
        </Typography>
        <StyledDivider />
        <Typography sx={{ color: "secondary.contrastText", fontWeight: "400", fontSize:"14px", textAlign:"justify" }}>
          Lorem ipsum dolor sit amet consectetur. Ultricies placerat diam mus
          sed. Neque proin sagittis at tristique. Ornare est velit leo dictumst
          ac purus urna ac. Consectetur massa lacus sapien neque. Fames
          pellentesque consectetur in viverra ipsum faucibus turpis.
          Pellentesque sagittis erat pellentesque id. Sit hendrerit risus at
          sed. Eleifend porttitor sed nunc morbi tortor feugiat lacinia.
          Scelerisque nec id varius magna id consectetur id turpis. Amet
          ultrices imperdiet dignissim urna urna tincidunt. Sapien id mi vitae
          lobortis nunc turpis. Bibendum quam id vulputate nunc. Sit tortor dui
          id faucibus duis. Pellentesque eu aenean eget eu aliquet a porttitor
          sollicitudin. Purus quis nunc proin morbi amet montes quam. Sed
          pellentesque eu aliquam volutpat potenti quis eleifend. Tristique diam
          sed sollicitudin leo amet sit sit dui facilisi. Massa pellentesque
          tellus gravida nulla. Neque tempus habitasse libero id. Quis morbi
          sagittis tristique risus. Lectus urna amet purus mauris a diam cras
          sit felis. Auctor ornare egestas integer id ornare urna duis. Dapibus
          nunc ante in nulla. Semper gravida sed mauris quisque porta ipsum
          interdum. Condimentum duis pellentesque parturient scelerisque posuere
          erat. Non nisl lectus est urna dictum gravida et consectetur tempor.
          Duis lectus urna lectus tortor sit sed amet. Mi sodales auctor
          lobortis sit ac scelerisque a elementum. Mi mollis tempor massa morbi
          rutrum id nec ut massa. Pulvinar vulputate velit porta non. Augue
          convallis facilisis pellentesque ornare ut fames amet. Egestas aenean
          scelerisque amet orci at. Leo magna tellus urna purus erat imperdiet
          potenti vitae. Maecenas nisl nunc eu risus vestibulum magna
          pellentesque velit condimentum. Integer tellus orci proin egestas
          ultrices. Morbi fermentum bibendum ornare ornare eget accumsan. Mattis
          odio quisque diam non lorem nulla ut molestie proin. Sed adipiscing
          purus facilisis placerat massa commodo eu pharetra. Eu velit mattis
          dui ut auctor. Pulvinar eget rhoncus consequat sollicitudin ultrices
          tempus egestas. Venenatis neque dolor neque pulvinar sed. Est purus
          sed sit non ac et.
        </Typography>
      </div>
    </>
  );
}

export default About;
