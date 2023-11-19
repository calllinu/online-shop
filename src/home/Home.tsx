import HomeContent from "../components/home-content/home-content"
import Footer from "./footer/footer"
import Header from "./header/header"
//import styles from './home.module.scss'


function Home() {
  return (
    <>
      <Header/>
      <HomeContent/> 
      <Footer/> 
    </>
  )
}

export default Home