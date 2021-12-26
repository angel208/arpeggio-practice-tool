import { extendTheme } from '@chakra-ui/react'

import Button from "./components/button";
import Heading from "./components/heading";
import Switch from "./components/switch";
import FormLabel from "./components/formLabel";
import Tooltip from './components/tooltip';

import styles from "./styles";
import colors from './colors';


const customTheme = extendTheme({
    styles,
    colors,
    components: {
      Button: Button,
      Heading: Heading,
      Switch: Switch,
      FormLabel: FormLabel,
      Tooltip: Tooltip
    },   
})
  
  
export default customTheme