import { atom } from "recoil";

const userAtom = atom({
  key: "loggedInUser",
  default: {},
});

export default userAtom;
