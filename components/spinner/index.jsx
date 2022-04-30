import spinnerCss from "./spinner.module.css";

function Spinner() {
  return <div class={spinnerCss["lds-ellipsis"]}><div></div><div></div><div></div><div></div></div>;
}

export default Spinner;