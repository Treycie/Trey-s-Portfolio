import './App.css'

function App() {
  const fetchData = async () =>{
    const skills = await apiGetSkills();
    console.log(skills.data);
    const single_skill = await apiGetSkill("")
    console.log(single_skill.data);
  }

  return (
    <>
     
    </>
  )
}

export default App
