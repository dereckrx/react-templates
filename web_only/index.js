import {App} from './app.js';
import {useStore} from "./store.js";

const x = React.createElement;

const AppWithStore = () => {
  const store = useStore();
  
  return (
    App({store})
  )
};

ReactDOM.render(
  x(AppWithStore),
  document.getElementById('app'));
