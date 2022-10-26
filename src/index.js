import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet, useParams, NavLink, useNavigate, useLocation } from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myapps" element={<Navigate replace to="/learn" />} />
        <Route path="/learn" element={<Learn />}>
          <Route path="courses" element={<Courses />}>
            <Route path=":courseid" element={<CourseId />} />
            <Route path=":courseid/:newparam" element={<CourseNew />} />
          </Route>
        </Route>
        <Route path="/learn/bundles" element={<Bundles />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
)//il Navigate è come un redirect, ovvero se scrivo nella barra di ricerca "/myapps", mi riporta a "/learn"
//le route imparentate servono a creare combinazioni di path, ad esempio la route
//"courses" è imparentata con la route "/learn", significa che sarà accessibile al path "/learn/courses"
//IMPORTANTISSIMO: se imparentiamo le route ciò implica che le route FIGLIE dovranno renderizzare il loro 
//componente DA QUALCHE PARTE DENTRO IL COMPONENTE DELLA ROUTE MADRE--->QUINDI SERVE <Outlet /> NEL COMPONENTE
//DELLA ROUTE MADRE PER DECIDERE DOVE RENDERIZZARE I FIGLI
//Invece la route /learn/bundles non è imparentata con la route /learn, ciò vuol dire che il componente di
//"/learn/bundles" rimpiazzerà completamente il componente di /learn
function Home() {
  return (
    <div>
      <h1>Home route</h1>
    </div>
  )
}

function Learn() {
  return (
    <div>
      <h1>Learn</h1>
      <h4>All courses are listed here</h4>
      <Link to="/learn/courses">courses</Link>
      <Link to="/learn/bundles">bundle</Link>
      <Outlet />
    </div>
    //Outlet serve a far sì che tutte le route che partono dalla route che monta
    //il componente attuale, in questo caso da "/learn" che è quella che monta il
    //il componente <Learn />, vengano renderizzate al posto di <Outlet />. Quindi 
    //il contenuto di "/learn/courses" verrà renderizzato lì
  )
}

function Courses() {
  const courses = ["angular", "react", "node", "vue"]
  return (
    <div>
      <h1>Courses list</h1>
      <h4>Courses card</h4>
      {courses.map(course => <NavLink to={"/learn/courses/" + course}>{course}</NavLink>)}
      <Outlet />
    </div>
  )
}

function CourseId() { //questo componente appartiene alla route /learn/courses/[parametro courseid]
  //ovvero la parola che scrivo dopo /learn/course/ è un parametro di nome courseid a cui posso accedere
  //tramite l'hook useParams()
  const params = useParams()
  const navigate = useNavigate() //useNavigate ritorna una funzione che va passata come
  //event listeners al tasto, come parametro vuole un path verso cui navigare e un oggetto con
  //chiave "state" e valore qualsiasi. Si comporta come un link ma permette di trasportare informazioni
  //sottoforma di oggetto js
  return (
    <div>
      <h1>URL param is: {params.courseid}</h1>
      <button
        onClick={() => navigate("/dashboard", { state: 399 })}
      >Price</button>
      <Outlet />
    </div>
  )
}

function CourseNew() {
  const obj = useParams()
  return (
    <h1>URL parameters: {Object.values(obj).map(el => <span>{el} </span>)}</h1>
  )
}

function Bundles() {
  return (
    <div>
      <h1>Bundles list</h1>
      <h4>Bundles card</h4>
    </div>
  )
}

function Dashboard() {
  const location = useLocation() //useLocation si usa per recuperare le informazioni passate tramite useNavigate
  console.log(location)
  return (
    <h1>{location.state}</h1>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
