import { useState } from 'react'
import { Combobox } from '@headlessui/react'

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
]

export function Example() {
  const [selectedPerson, setSelectedPerson] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <ComboboxInput
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(person) => person.name}
      />
      <ComboboxOptions>
        {query.length > 0 && (
          <ComboboxOption value={{ id: null, name: query }}>
            Create "{query}"
          </ComboboxOption>
        )}
        {filteredPeople.map((person) => (
          <ComboboxOption key={person.id} value={person}>
            {person.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  )
}


