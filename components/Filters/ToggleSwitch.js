import React from 'react'
import { Box, FormControl, FormLabel, Switch } from "@chakra-ui/react"

export default function ToggleSwitch({name, checked, callBack, disabled=false}) {    

    return (
        <Box>
            
            <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='email-alerts' mb='0'>
                    {name}
                </FormLabel>
                <Switch 
                name={name}
                id={name}
                isChecked={checked}
                isDisabled={disabled}
                onChange={callBack} />
            </FormControl>

        </Box>
       
    )
}

