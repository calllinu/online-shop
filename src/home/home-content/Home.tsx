import HomeContent from "../../components/home-content/home-content";
import Footer from "../footer/footer";
import Header from "../header/header";
import { useEffect } from "react";
import { getDocs, collection } from 'firebase/firestore';
import { database } from '../../firebaseConfig/firebaseConfig';
import { useDispatch } from 'react-redux';
import { setCategories } from '../../redux-fetching/categoriesSlice';
import { DataItem, CategoryData } from "../../redux-fetching/interfaces";
import { setLocationCountries } from "../../redux-fetching/locationCountriesSlice";
import { setPhotos } from "../../redux-fetching/photoSlice";
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'; // Import storage methods

const Home = () => {
  const collectionRef = collection(database, "location-countries");
  const collectionCat = collection(database, "categories");
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const [locationResponse, categoryResponse] = await Promise.all([
        getDocs(collectionRef),
        getDocs(collectionCat),
      ]);

      const locationData = locationResponse.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      })) as DataItem[];

      dispatch(setLocationCountries(locationData));

      const categoryData = categoryResponse.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      })) as CategoryData[];

      dispatch(setCategories(categoryData));


      const storage = getStorage();
      const photosRef = ref(storage, 'background/');
      const photoUrls = await listAll(photosRef);
      const photoData = await Promise.all(photoUrls.items.map(async (photoRef) => {
        const url = await getDownloadURL(photoRef);
        return { id: photoRef.name, url };
      }));

      dispatch(setPhotos(photoData));
      console.log(photoData);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  return (
    <>
      <Header />
      <HomeContent />
      <Footer />
    </>
  );
};

export default Home;

