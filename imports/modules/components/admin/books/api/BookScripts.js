import { bookData } from "./BookData";
try {
  bookData.rawCollection().createIndex({ title: "text" });
} catch (e) {
  // console.log(e);
}
