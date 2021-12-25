import React from 'react'
import { Box } from '@chakra-ui/react'

export default function PlayerSetting({ onClick, stateVariable,  TrueIcon, FalseIcon }) {
    return (
        <Box 
        cursor="pointer" 
        _hover={{ transform:'scale(1.2)' }} 
        transition='0.25s' 
        onClick={ onClick  }>
            { stateVariable ? <TrueIcon size={20}/> : <FalseIcon size={20} />}
        </Box>
    )
}
