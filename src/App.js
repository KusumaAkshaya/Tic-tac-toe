import './App.css';
import {useState} from 'react'

function Square({value, onSquareClick}){
  return(
    <button className="Square" onClick={onSquareClick} >
     {value}  
    </button>
  )
}

export default function Board(){
    const [xIsNext, setxIsNext] = useState(true) // to vary btw x and o
    const [squares, setsquares] = useState(Array(9).fill(null))

    function HandleClick(i){
      if(squares[i] || calculateWinner(squares)){  //checks whether the square is empty, if not empty it will return 
        return;                                    //also checks if game is finished or not
      }
      const nextSquare = squares.slice();
      if(xIsNext) {  
        nextSquare[i] = 'X';
      } else {     
        nextSquare[i] = 'O';
      }
      setsquares(nextSquare)  
      setxIsNext(!xIsNext) // updates X and O 
    } 

    const winner = calculateWinner(squares)
    let status;
    if(winner){
      status = 'Winner is '+ winner    //if winner is not null, shows winner
    } else {
      status = 'Next Player is '+ (xIsNext ? 'X' : 'O') //if winner is null, shows next player
    }

    return(
    <>
    <h2>{status}</h2>
    <div className="Row">
      <Square value={squares[0]} onSquareClick={() => HandleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => HandleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => HandleClick(2)} />
    </div>
    <div className="Row">
      <Square value={squares[3]} onSquareClick={() => HandleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => HandleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => HandleClick(5)} />
    </div>
    <div className="Row">
      <Square value={squares[6]} onSquareClick={() => HandleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => HandleClick(7)} />
      <Square value={squares[8]} onSquareClick={()  => HandleClick(8)} />
    </div>
    </>
    );
}


function calculateWinner(squares){
  const lines = [ //winning lines
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(let i=0; i<lines.length; i++){ 
    const [a, b, c] = lines[i]; // making a, b, c = winnings lines
    if(squares[a] && squares[a]==squares[b] && squares[a] == squares[c]){ // checking if square is not null and all three indices having same value
      return squares[a]
    }
  }
  return null; //if all are not same returns null
}


