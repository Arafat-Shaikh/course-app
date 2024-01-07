import { atom } from "recoil";

const coursesAtom = atom({
  key: "coursesState",
  default: [],
});

export default coursesAtom;
