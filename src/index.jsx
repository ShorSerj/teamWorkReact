import React from 'react'
import { render } from 'react-dom'

const City = (props) => {
    console.log(props)
    return (<div >
        {props.item.like && <span>&diams;</span>}
        <span>{props.item.nameCity}</span>
        <span> : </span>
        <span>{props.item.temperature}</span>
        <button onClick={() => { this.handleClick(props.item.nameCity) }}>like</button>
    </div>)
}
class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            towns: [{
                nameCity: 'Moskow',
                temperature: '25',
                like: false
            },
            {
                nameCity: 'Kazan',
                temperature: '13',
                like: true
            },
            {
                nameCity: 'Barnaul',
                temperature: '8',
                like: false
            },]
        }
        this.newTownRef = React.createRef()
        this.newTownTemperatureRef = React.createRef()
    }
    handleClick = (nameCity) => {
        const towns = this.state.towns
        // console.log()
        if (Array.isArray(towns)) {
            const findCity = (element, index, array) => {
                if (element.nameCity == nameCity) {
                    return true
                }
            }
            const thisTown = towns.find(findCity)
            thisTown.like = thisTown.like ? false : true
            console.log(thisTown)

            const anotherTowns = towns.filter((item) => {
                return item.nameCity === thisTown.nameCity ? false : true
            })

            const newStateTowns = [thisTown, ...anotherTowns]
            console.log(newStateTowns)
            this.setState({ towns: newStateTowns })
        }
    }
    handleClickAddCity = () => {
        const newTown = this.newTownRef.current.value
        const newTemperatureTown = this.newTownTemperatureRef.current.value
        const newStateItem = {
            nameCity: newTown,
            temperature: newTemperatureTown,
            like: false
        }
        const oldState = this.state.towns

        oldState.push(newStateItem)
        this.setState({ towns: oldState })
    }

    render() {
        return (
            <div className="">
                {this.state.towns.map((item, index) =>
                    <City item={item} key={`${item.nameCity}-${index}`} />
                )}
                <div className="">
                    <label htmlFor="">Город
                        <input type="text" ref={this.newTownRef} />
                    </label>
                    <label htmlFor="">Температура
                        <input type="text" ref={this.newTownTemperatureRef} />
                    </label>
                    <button onClick={this.handleClickAddCity}>Добавить город</button>
                </div>
            </div>
        )
    }
}

const App = () => {
    return (
        <>
            <div>hello world</div>
            <Weather />
        </>
    )
}

render(<App />, document.getElementById('root'))
