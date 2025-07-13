import { useState, useEffect } from "react";
import { getMarvelMovies, getMarvelComics } from "./MarvelAPI";
import { Header } from "./components/Header";
import { TabButtons } from "./components/TabButtons";
import { SearchBar } from "./components/SearchBar";
import { MovieCard } from "./components/MovieCard";
import { Pagination } from "./components/Pagination";
import { Modal } from "./components/Modal";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [tab, setTab] = useState("movies");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const getData = async () => {
    setLoading(true);
    setError("");

    try {
      let result;
      let offset = (page - 1) * 8;

      if (tab === "movies") {
        result = await getMarvelMovies(offset, 8, search);
      } else {
        result = await getMarvelComics(offset, 8, search);
      }

      // Calculate total pages
      let total = result.data.total;
      let pages = Math.ceil(total / 8);
      setTotalPages(pages);

      // Sort the items
      let items = [...result.data.results];

      if (sortBy === "title") {
        if (sortOrder === "asc") {
          items.sort(function (a, b) {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          });
        } else {
          items.sort(function (a, b) {
            if (a.title > b.title) {
              return -1;
            }
            if (a.title < b.title) {
              return 1;
            }
            return 0;
          });
        }
      }

      if (sortBy === "year") {
        if (sortOrder === "asc") {
          items.sort(function (a, b) {
            let yearA = a.startYear || 0;
            let yearB = b.startYear || 0;
            return yearA - yearB;
          });
        } else {
          items.sort(function (a, b) {
            let yearA = a.startYear || 0;
            let yearB = b.startYear || 0;
            return yearB - yearA;
          });
        }
      }

      setItems(items);
    } catch (err) {
      setError("Error loading data!");
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    getData();
  }, [page, tab, search, sortBy, sortOrder]);

  // Function to handle search
  const handleSearch = () => {
    setPage(1);
    getData();
  };

  // Function to handle sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else {
        setSortOrder("asc");
      }
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    getData();
  };


  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

 
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Function to show movies
  const showMovies = () => {
    setTab("movies");
    setPage(1);
    setSearch("");
  };

  // Function to show comics
  const showComics = () => {
    setTab("comics");
    setPage(1);
    setSearch("");
  };

  // Function to show modal
  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />


      <div className="container mx-auto px-4 py-8">
        <TabButtons tab={tab} showMovies={showMovies} showComics={showComics} />
        
        <SearchBar 
          search={search} 
          setSearch={setSearch} 
          sortBy={sortBy} 
          handleSort={handleSort} 
          sortOrder={sortOrder} 
          setSortOrder={setSortOrder} 
          handleSearch={handleSearch} 
        />
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6 text-center">
            <p>{error}</p>
            <button
              onClick={getData}
              className="mt-2 px-4 py-2 bg-white text-red-500 rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <p className="text-gray-700 mt-4 text-lg">Loading...</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <MovieCard 
                key={item.id} 
                item={item} 
                tab={tab} 
                openModal={openModal} 
              />
            ))}
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <Pagination 
            page={page} 
            totalPages={totalPages} 
            setPage={setPage} 
            prevPage={prevPage} 
            nextPage={nextPage} 
          />
        )}

        {!loading && !error && items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-700 text-xl">No {tab} found!</p>
          </div>
        )}
      </div>

      <Modal 
        showModal={showModal} 
        selectedItem={selectedItem} 
        closeModal={closeModal} 
        tab={tab} 
      />
    </div>
  );
}

export default App;
