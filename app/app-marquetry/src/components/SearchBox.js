import { useRef, useState, useMemo } from "react"
import { createAutocomplete } from '@algolia/autocomplete-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Autocomplete from "./Autocomplete";
import './searchBox.css'

const SearchBox = (props) => {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false
  })

  const autocomplete = useMemo(() => createAutocomplete({
    placeholder: 'Busca tu cliente',
    onStateChange: ({ state }) => setAutocompleteState(state),
    getSources: () => [{
      sourceId: 'offers-next-api',
      getItems: ({ query }) => {
        const queryClean = query.replace(/ |-/g, '')
        if (!!queryClean) {
          return fetch(`http://192.168.1.16:10101/api/marquetry/search?q=${queryClean}`)
            .then(res => res.json())
            .catch(console.log())
        }
      }
    }],
    ...props
  }), [props])

  const formRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current
  })
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current
  })

  return (
    <div className="cotainer-search">
      <form ref={formRef} {...formProps}>
        <div>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='input-icon'/>
          <input ref={inputRef} class="input-search" {...inputProps} />
        {
          autocompleteState.isOpen && (
            <div className='autocomplete-box' ref={panelRef} {...autocomplete.getPanelProps()}>
              {autocompleteState.collections.map((collection, index) => {

                const { items } = collection
              
                return (
                  <section key={`section-${index}`}>
                    {items.length > 0 && (
                      <ul {...autocomplete.getListProps()}>
                        {
                          items.map((item, index) => {
                            if(index < 5)
                              return <Autocomplete key={item.id} {...item}/>
                            return []
                          })
                        }
                      </ul>
                    )}
                  </section>
                )
              })}
            </div>
          )
        }
        </div>
      </form>
    </div>
  )
}


export default SearchBox