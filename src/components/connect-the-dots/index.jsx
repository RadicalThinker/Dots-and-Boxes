import { useState } from 'react';
import './style.css'
import { useEffect } from 'react';
import logo from './images.png';
function Square({ value }) {
    return <button className="square" >{value}</button>
}

function Dots() {
    return <img src={logo} alt="fuc" />
}

function Bar({ onClick, value, id }) {
    return <button className="bar" id={value} onClick={onClick}></button>;
}

function Bary({ onClick, value }) {
    return <button className="bary" id={value} onClick={onClick}></button>;
}

export default function ConnectTheDots() {
    const [game, setGame] = useState(false);
    const [form, setForm] = useState(true);
    const [player1Name, setPlayer1Name] = useState();
    const [player2Name, setPlayer2Name] = useState();
    const [dots, setDots] = useState(Array(40).fill(0));
    console.log(dots);
    const [squares, setSquares] = useState(Array(16).fill(''));
    const [isXTurn, SetXTurn] = useState(true);
    const [status, setStatus] = useState();
    const [status2, setStatus2] = useState();
    const [xCount, setXCount] = useState(0);
    const [yCount, setYCount] = useState(0);

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        setPlayer1Name(formData.get('player1'));
        setPlayer2Name(formData.get('player2'));
        setGame(true);
        setForm(false);
    }

    function handleclick(currentvalue) {
        let cpydots = [...dots];
        if (dots[currentvalue] !== 1) {
            SetXTurn(!isXTurn);
            cpydots[currentvalue] = 1;
        }
        let a = document.getElementById(currentvalue);
        a.className = 'bar1';
        if ((currentvalue < 9 && currentvalue > 3) || (currentvalue < 18 && currentvalue > 12) || (currentvalue < 27 && currentvalue > 21) || (currentvalue < 36 && currentvalue > 30)) {
            a.className = 'bary1'
        }
        setDots(cpydots);
        getwinner(cpydots);
        console.log(squares)
        console.log(cpydots)
    }
    useEffect(() => {
        if (squares.filter(item => item === '').length !== 0) {
            setStatus(`${isXTurn ? `1️⃣${player1Name}` : `2️⃣${player2Name}`} TURN!!`)
            setStatus2(`${player1Name}:${xCount}  ${player2Name}:${yCount}`)
        }
        else if (xCount > yCount) {
            setStatus(`winner is ${player1Name}`)
            setStatus2(`${player1Name}:${xCount} ${player2Name}:${yCount}`)
        }
        else if (yCount > xCount) {
            setStatus(`winner is ${player2Name}`)
            setStatus2(`${player1Name}:${xCount} ${player2Name}:${yCount}`)
        }
        else {
            setStatus(`This is a Draw `)
            setStatus2(`${player1Name}:${xCount} ${player2Name}:${yCount}`)
        }
    }, [squares, isXTurn, player1Name, player2Name, yCount, xCount])
    function getwinner(dots) {
        let cpySquares = [...squares];
        const winpattern = [[0, 9, 4, 5],
        [1, 10, 5, 6],
        [2, 11, 6, 7],
        [3, 12, 7, 8],
        //-----------//
        [9, 18, 13, 14],
        [10, 19, 14, 15],
        [11, 20, 15, 16],
        [12, 21, 16, 17],
        //-----------//
        [18, 27, 22, 23],
        [19, 28, 23, 24],
        [20, 29, 24, 25],
        [21, 30, 25, 26],
        //--------//
        [27, 36, 31, 32],
        [28, 37, 32, 33],
        [29, 38, 33, 34],
        [30, 39, 34, 35]
        ];
        for (let i = 0; i < winpattern.length; i++) {
            const [a, b, c, d] = winpattern[i];
            if (dots[a] === 1 && dots[b] === 1 && dots[c] === 1 && dots[d] === 1) {
                if (cpySquares[i] === '') {
                    cpySquares[i] = isXTurn ? 'X' : 'O';
                    SetXTurn(isXTurn);
                }
                setSquares(cpySquares);
            }
        }
        let countx = 0
        let county = 0
        for (let j = 0; j < cpySquares.length; j++) {
            if (cpySquares[j] === 'X') {
                countx++;
            }
            if (cpySquares[j] === 'O') {
                county++;
            }
        }
        setXCount(countx)
        setYCount(county)
        return 0;
    }
    function restart(){
        setForm(true);
        setGame(false);
        setDots(Array(40).fill(0));
        setSquares(Array(16).fill(''));
        setXCount(0);
        setYCount(0);
    }

    return (
        <div >
            {form && (<div className='body'>
                <div className='form-box'>
                    <div className="inputs">
                        <h1>Dots-And-Boxes</h1>
                        <form className='form' onSubmit={handleSubmit}>
                            <label for="player1" aria-placeholder='example: aditya'>Player 1 Name:</label><br />
                            <input type="text" id="player1" name="player1" placeholder='example: aditya' /><br /><br />
                            <label for="player2">Player 2 Name:</label><br />
                            <input type="text" id="player2" name="player2" placeholder='example: harshita'/><br /><br />


                            <input type="submit" className="submit" value="Submit" />
                        </form></div>
                </div>
            </div>
            )}
            {game && (
                <div className="return">
                <div className="backimg"></div>
                <div className="game">
                    <div className="wrapper">
                        <div className="dots-container bottom">
                            <div className="row">
                                <div className="btn top">
                                    <Dots /> <Bar value={0} onClick={() => handleclick(0)} />
                                    <Dots /> <Bar value={1} onClick={() => handleclick(1)} />
                                    <Dots /> <Bar value={2} onClick={() => handleclick(2)} />
                                    <Dots /> <Bar value={3} onClick={() => handleclick(3)} />
                                    <Dots />
                                </div>
                                <div className="sqrt">
                                    <Bary value={4} onClick={() => handleclick(4)} />
                                    <Square value={squares[0]} /> <Bary value={5} onClick={() => handleclick(5)} />
                                    <Square value={squares[1]} /> <Bary value={6} onClick={() => handleclick(6)} />
                                    <Square value={squares[2]} /> <Bary value={7} onClick={() => handleclick(7)} />
                                    <Square value={squares[3]} /> <Bary value={8} onClick={() => handleclick(8)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="btn">
                                    <Dots /> <Bar value={9} onClick={() => handleclick(9)} />
                                    <Dots /> <Bar value={10} onClick={() => handleclick(10)} />
                                    <Dots /> <Bar value={11} onClick={() => handleclick(11)} />
                                    <Dots /> <Bar value={12} onClick={() => handleclick(12)} />
                                    <Dots />
                                </div>
                                <div className="sqrt">
                                    <Bary value={13} onClick={() => handleclick(13)} />
                                    <Square value={squares[4]} /> <Bary value={14} onClick={() => handleclick(14)} />
                                    <Square value={squares[5]} /> <Bary value={15} onClick={() => handleclick(15)} />
                                    <Square value={squares[6]} /> <Bary value={16} onClick={() => handleclick(16)} />
                                    <Square value={squares[7]} /> <Bary value={17} onClick={() => handleclick(17)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="btn">
                                    <Dots /> <Bar value={18} onClick={() => handleclick(18)} />
                                    <Dots /> <Bar value={19} onClick={() => handleclick(19)} />
                                    <Dots /> <Bar value={20} onClick={() => handleclick(20)} />
                                    <Dots /> <Bar value={21} onClick={() => handleclick(21)} />
                                    <Dots />
                                </div>
                                <div className="sqrt">
                                    <Bary value={22} onClick={() => handleclick(22)} />
                                    <Square value={squares[8]} /> <Bary value={23} onClick={() => handleclick(23)} />
                                    <Square value={squares[9]} /> <Bary value={24} onClick={() => handleclick(24)} />
                                    <Square value={squares[10]} /> <Bary value={25} onClick={() => handleclick(25)} />
                                    <Square value={squares[11]} /> <Bary value={26} onClick={() => handleclick(26)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="btn">
                                    <Dots /> <Bar value={27} onClick={() => handleclick(27)} />
                                    <Dots /> <Bar value={28} onClick={() => handleclick(28)} />
                                    <Dots /> <Bar value={29} onClick={() => handleclick(29)} />
                                    <Dots /> <Bar value={30} onClick={() => handleclick(30)} />
                                    <Dots />
                                </div>
                                <div className="sqrt">
                                    <Bary value={31} onClick={() => handleclick(31)} />
                                    <Square value={squares[12]} /> <Bary value={32} onClick={() => handleclick(32)} />
                                    <Square value={squares[13]} /> <Bary value={33} onClick={() => handleclick(33)} />
                                    <Square value={squares[14]} /> <Bary value={34} onClick={() => handleclick(34)} />
                                    <Square value={squares[15]} /> <Bary value={35} onClick={() => handleclick(35)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="btn bottom">
                                    <Dots /> <Bar value={36} onClick={() => handleclick(36)} />
                                    <Dots /> <Bar value={37} onClick={() => handleclick(37)} />
                                    <Dots /> <Bar value={38} onClick={() => handleclick(38)} />
                                    <Dots /> <Bar value={39} onClick={() => handleclick(39)} />
                                    <Dots />
                                </div>
                            </div>
                        </div>
                        <div className="status-box">
                            <h1 className='status1'>{status}</h1><hr/>
                            <h1 className='score'>SCORE 💯</h1><hr/>
                            <h1 className="status2">{status2}</h1>
                        </div>
                    </div>
                    <button className="restart" onClick={restart}>RESTART</button>
                </div>
            </div>
            )

            }
        </div>
    )
}
