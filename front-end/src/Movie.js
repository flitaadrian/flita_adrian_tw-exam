import {Button} from "primereact/button";
import './style.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {OrderList} from "primereact/orderlist";
import {Link, useParams} from "react-router-dom";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";




const Movie = () => {
    const [movies,setMovies]=useState([]);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [isEditing,setIsEditing]=useState(false);
    const [movie,setMovie]=useState({title:'',category:'',publicationDate:''});
    const [count,setCount]=useState(0)

    const handleModalOpen = () => {
        setIsModalOpened(true);

    };

    const handleInputChange = (e) => {
        setMovie({...movie, [e.target.name]:e.target.value});
    }

    const handleModalClose = () => {
        setIsModalOpened(false);
        setIsEditing(false);
    };

    const handleEditItem = (row) => {
        const item=(movies.find(row2=>row2.id===row.id));
        setMovie({
            id:item.id,
            title:item.title,
            category:item.category,
            publicationDate:item.publicationDate,
        })
        setIsEditing(true);
        handleModalOpen();
    }

    const handleDeleteItem = (row) => {
        const item=(movies.find(row2=>row2.id===row.id));
        axios.delete(`http://localhost:8080/movie/${item.id}`)
            .then(() => {
                console.log('Deleted item!');
                setCount(count+1);

            })
            .catch((error) => {
                console.log('Error:',error);
                alert(error.response.data.message);

            })
    }

    const handleEdit = () => {
        axios.put(`http://localhost:8080/movie/${movie.id}`,movie)
            .then(() =>{
                setCount(count+1);
                console.log('Spacecraft:',movie);
                handleModalClose();
            })
            .catch(error => {
                console.log('Error',error);
                alert(error.response.data.message);



            })

    }

    const handleMovie = () => {
        axios.post('http://localhost:8080/movie',movie)
            .then(res => {
                setCount(count+1);
                handleModalClose()
            })
            .catch(error => {
                console.log('Error',error);
                alert(error.response.data.message);

            })

    }

    const handleAddMovie = () => {
        setMovie({title:'',category:'',publicationDate:''});
        setIsEditing(false)
        handleModalOpen()
    }
    useEffect(() => {
        axios.get(`http://localhost:8080/movie`)
            .then(res => {
                setMovies(res.data);
            })
    },[count])

    const images=[
        "https://upload.wikimedia.org/wikipedia/ro/2/2b/Avatar-Poster.jpg",
        "https://upload.wikimedia.org/wikipedia/en/1/19/Titanic_%28Official_Film_Poster%29.png",
        "https://upload.wikimedia.org/wikipedia/ro/0/09/Jumanji-_Aventur%C4%83_%C3%AEn_jungl%C4%83.jpg",
        "https://m.media-amazon.com/images/M/MV5BNmZkYjQzY2QtNjdkNC00YjkzLTk5NjUtY2MyNDNiYTBhN2M2XkEyXkFqcGdeQXVyMjMwNDgzNjc@._V1_.jpg",
        "https://upload.wikimedia.org/wikipedia/en/9/90/Creed_II_poster.png",
        "https://m.media-amazon.com/images/M/MV5BMjA4NDg3NzYxMF5BMl5BanBnXkFtZTcwNTgyNzkyNw@@._V1_.jpg",
        "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        "https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg"
    ]

    const itemTemplate = (item) => {
        return (
            <div className="product-item">
                <div className="image-container">
                    <img src={images[item.id]} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.name} />
                </div>
                <div className="product-list-detail">
                    <h5 className="mb-2">{item.title}</h5>
                    <i className="pi pi-send "></i>
                    <span className="product-category p-mr-2">{item.category}</span>
                    <i className="pi pi-sort-amount-up "></i>
                    <span className="product-category">{item.publicationDate}</span>
                </div>
                <div className="product-list-action">
                    <Link to={`/crewmember/${item.id}`}>
                        <Button label="Crewmembers" />
                    </Link>
                    <Button label="Edit" onClick={()=> handleEditItem(item)} />
                    <Button label="Delete" className={"p-button-danger"}  onClick={()=> handleDeleteItem(item)} />
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="orderlist-demo">
                <h2 className="title">Movies</h2>
                <Button className={"btn"} onClick={handleAddMovie}>Add movie</Button>
                <div className="card">
                    {movies ?
                        <OrderList value={movies}
                                   listStyle={{ height: "auto" }}
                                   dataKey="id"
                                   itemTemplate={itemTemplate}
                                   header={"Movie"}/>
                        : null}
                </div>

                <Dialog header="Header" visible={isModalOpened} style={{ width: '50vw' }}  onHide={handleModalClose}>
                    <span className="p-float-label p-m-6">
                    <InputText id="title" name={"title"} value={movie.title} onChange={handleInputChange} />
                    <label htmlFor="title">Title</label>
                    </span>
                    <span className="p-float-label p-m-6">
                    <InputText id="category" name={"category"} value={movie.category} onChange={handleInputChange} />
                    <label htmlFor="category">Category</label>
                    </span>
                    <span className="p-float-label p-m-6">
                    <InputText id="publicationDate" name={"publicationDate"} value={movie.publicationDate} onChange={handleInputChange} />
                    <label htmlFor="publicationDate">Publication date</label>
                    </span>
                    {isEditing ? <Button className={"p-ml-6"} label={"Edit movie"} onClick={handleEdit}/>:<Button className={"p-ml-6"} label={"Add movie"} onClick={handleMovie}/>}
                </Dialog>

            </div>
        </>
    )

}

export default Movie;