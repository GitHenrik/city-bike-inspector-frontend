import {Station} from '../App'
import './stationTable.css'

const StationTable = (props: {stations: Station[], getCoordinates: (station: Station) => void}) => {
  if (!props.stations.length) return <p>Stations not loaded.</p>
  return (
    <table className="station-table">
      <thead>
        <tr>
          {Object.keys(props.stations[0]).map(key => <td key={key}>{key}</td>)}
        </tr>
      </thead>
      <tbody>
        {props.stations.map(station => {
          return (
            <tr key={station.fid} onClick={(e) => props.getCoordinates(station)}>
              {Object.values(station).map((value, i) => <td key={i}>{value}</td>)}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default StationTable
