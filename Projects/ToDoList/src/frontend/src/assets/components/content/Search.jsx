import { InputGroup , InputGroupInput , InputGroupAddon} from '@/components/ui/input-group'
import { SearchIcon } from 'lucide-react'
import React from 'react'
const Search = () => {
  function searchPlaceHolder(category){
    return `Search for ${category}`
  }
  return (
    <>
    <InputGroup >
        <InputGroupInput className="" placeholder={searchPlaceHolder('Smartphones')} />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
    </InputGroup>
    

    
    </>
  )
}

export default Search