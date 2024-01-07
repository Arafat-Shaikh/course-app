import { atom } from "recoil";

const instructorsAtom = atom({
  key: "instructorsState",
  default: [],
});

export default instructorsAtom;
