import Main from '../../pages/main/main';

 type AppProps = {
   offers: number;
 }

function App({ offers }: AppProps): JSX.Element {
  return (
    <Main offers={ offers } />
  );
}

export default App;
