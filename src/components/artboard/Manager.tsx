// -- model component -------------------------------------------------------------------------------
import IArtboardModel from '../../models/artboard/Artboard';
import ITurtleModel from '../../models/artboard/Turtle';
import { useContext, useEffect, useState } from 'react';
import { ArtBoardContext } from '../../context/ArtBoardContext';
import Artboard from './Artboard';
import Monitor from '../Monitor';
// -- view-model component definition --------------------------------------------------------------

/**
 * ViewModel of the ArtboardManager Framework component.
 */
export default function (): JSX.Element {
  // list of ids of boards which are playing.
  const [activeBoards, setActiveBoards] = useState<number[]>([1]);
  // list of all artboards generated by the user.
  const { artBoardList, setArtBoardList } = useContext(ArtBoardContext);

  // list of IDs of all artboards i.e. artboardIDList.length = artboardList.length .
  const [artboardIDList, setartboardIDList] = useState<number[]>([]);

  // function to add a new Artboard
  const addArtboard = (id: number, x: number, y: number, angle: number) => {
    // check if the artboard with same id already exists.
    const isPresent = artboardIDList.includes(id);
    if (isPresent) {
      return;
    }
    setartboardIDList([...artboardIDList, id]);
    const newTurtle = new ITurtleModel(id, x, y, angle);
    const newArtboard = new IArtboardModel(id, newTurtle);
    // _ArtboardManagerModel.addArtboard(newArtboard);
    setArtBoardList([...artBoardList, newArtboard]);
  };

  // manager can initialise several artboards at a time and store them
  // in the artboardList.
  useEffect(() => {
    for (let i = 1; i <= 2; i++) {
      addArtboard(i, 700, 500, 0);
    }
  });

  const moveToTop = (id: number) => {
    for (let i = 0; i < artboardIDList.length; i++) {
      const vid = `art-board-${artboardIDList[i]}`;
      const ele = document.getElementById(vid);
      if (ele === null) continue;
      ele.style.position = 'absolute';
      if (artboardIDList[i] == id) {
        ele.style.zIndex = '10000';
      } else {
        ele.style.zIndex = '5';
      }
    }
  };

  const updateHorizontalScroll = (isEnabled: boolean) => {
    isEnabled;
    // Pass it as prop in artboard below.
  };

  const removeArtboard = (id: number) => {
    // check if the artboard with id exists or not.
    const isPresent = artboardIDList.includes(id);
    if (!isPresent) {
      return;
    }
    const updatedIdList = artboardIDList.filter((bId) => id != bId);
    setartboardIDList(updatedIdList);
    // _ArtboardManagerModel.removeArtboard(newArtboard);
    const updatedArtboardList = artBoardList.filter((board) => board._id != id);
    setArtBoardList(updatedArtboardList);
  };

  const updateTurtleWrap = (isWrapOn: boolean) => {
    isWrapOn;
    // Pass it as prop in artboard below.
  };

  const playArtboard = (id: number) => {
    // Add the id of artboard to the active artboard list.
    const isPresent = activeBoards.includes(id);
    if (isPresent) {
      return;
    }
    setActiveBoards([id, ...activeBoards]);
  };

  const stopArtboard = (id: number) => {
    // Remove the id of artboard from the active artboard list.
    const isPresent = activeBoards.includes(id);
    if (!isPresent) {
      return;
    }
    const boards = activeBoards.filter((bId) => bId != id);
    setActiveBoards(boards);
  };

  Monitor.registerUpdateScroll(updateHorizontalScroll);
  Monitor.registerUpdateWrap(updateTurtleWrap);
  Monitor.registerRemoveArtboard(removeArtboard);
  Monitor.registerAddArtboard(addArtboard);
  Monitor.registerPlayArtboard(playArtboard);
  Monitor.registerStopArtboard(stopArtboard);

  return (
    <>
      <div id="artboard-manager-wrapper">
        <Artboard moveToTop={moveToTop} activeBoards={activeBoards} />
      </div>
    </>
  );
}
