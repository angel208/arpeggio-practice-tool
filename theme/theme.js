import { extendTheme } from '@chakra-ui/react'

import Button from "./components/button";
import Heading from "./components/heading";
import Switch from "./components/switch";
import FormLabel from "./components/formLabel";

import colors from "./styles";


const customTheme = extendTheme({
    colors,
    components: {
      Button: Button,
      Heading: Heading,
      Switch: Switch,
      FormLabel: FormLabel
    },   
})
  
  
export default customTheme