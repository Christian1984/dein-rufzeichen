import { useStore } from "../store/ZustandStore";

const ResultsView = () => {
  const availableCallsigns = useStore((state) => state.availableCallsigns);

  // morsbarkeit
  // silbenlaenge phentic
  // phonie
  //
  // merken

  return (
    <>
      {availableCallsigns.length <= 0 && <span>keine Ergebnisse</span>}
      {availableCallsigns.length > 0 && (
        <ul>
          {availableCallsigns.map((callsign) => (
            <li>{callsign}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export { ResultsView };
