export default function SearchBar({ setQuery }) {

    function handleOnChange(event) {
        console.log("handle on change");
        setQuery(event.target.value);
    }

    return (
        <input type="text" onChange={handleOnChange} />
    )
}