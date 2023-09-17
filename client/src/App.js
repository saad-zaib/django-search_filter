import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/listing?title=${search}`)
      .then((response) => {
        if (response.data && Array.isArray(response.data.results)) {
          setData(response.data.results); // Set the data from the "results" array
          console.log(response.data.results);
        } else {
          console.error("Data format is incorrect:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [search]);

  useEffect(() => {

    //add click event listener to the doc
    const handleClickOutside = (e) => {
      if (componentRef.current && !componentRef.current.contains(e.target)) {
        setIsClicked(false);
      }}

      //Attach the event lilstener when the component mounts
      document.addEventListener("click", handleClickOutside);
      return () =>{
        document.removeEventListener("click",handleClickOutside)
      
    };
  },[]);

  const handleClick = () => {
    if (data && data.length > 0) {
      setIsClicked(true);
    }
  };

  return (
    <div ref={componentRef}>
      <div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
        ></input>
        <button disabled={!data || data.length === 0} onClick={handleClick}>
          Search
        </button>
      </div>
      {isClicked && (
        <ul>
          {data &&
            data.map((item) => (
              <li key={item.id}>
                <strong>Title</strong>
                {item.title}
                <br />
                <strong>Author</strong> {item.author_name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default App;
