import { ImageProps as RNImageProps, Image as RNImage } from "react-native";
import { ImageList, images } from "../assets/images";
import { FunctionComponent } from "react";

export type ImageProps = Omit<RNImageProps, "source"> & {
  name: ImageList;
};

export const Image: FunctionComponent<ImageProps> = (props) => {
  return <RNImage {...props} source={images[props.name]} />;
};
