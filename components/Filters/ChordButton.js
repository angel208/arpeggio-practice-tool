import React from 'react'
import { useState } from 'react'
import { Box, Text } from '@chakra-ui/react'

export default function ChordButton( { chord, active, callback } ) {


    const [chordSymbol, setChordSymbol] = useState(chord.symbol)


    function alternateActive () {
        callback( chord )
    }
 
    return (
        <Box  id={chordSymbol} onClick={  alternateActive }>
            
            <Box 
            py={0.5} 
            px={1}
            my={2.5} 
            mx={1} 
            background={'white'} 
            borderRadius={'5px'}
            shadow={'md'}
            fontSize={'0.6rem'}
            cursor={'pointer'}
            _hover={{shadow:' 0 4px 8px 0 rgba(0,0,0,0.6) '}}
            transition={'box-shadow  0.2s'}
            borderLeft={'8px solid'}
            borderColor={ active ? "brand.100" : "white" }
            sx={{ caretColor: 'transparent' }}
            >
                <Text my={1.5} cur>
                    { chordSymbol }
                </Text>
            </Box>

        </Box>
    )
}
