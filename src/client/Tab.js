import Main from "../views/Main/Main";

function Tab(props){

    const tab = props.tab;

    if(tab === "main") {
        return <Main/>;
    }

}

export default Tab;