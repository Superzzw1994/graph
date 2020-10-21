import {upload} from "SRC_UTILS/fetch";
import API from "SRC_API/index";

export const uploadPic = (pic) => {
  return upload(API.UPLOAD, pic)
}