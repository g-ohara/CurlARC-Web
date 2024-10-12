'use client';

import React, { useState } from 'react';
import RecordHeader from './components/recordHeader';
import ScoreBoardSection from './components/scoreBoardSection';
import MatchDetailsSection from './components/matchDetailsSection';
import StonePositionsSection from './components/stonePositionsSection';
import { getRecordDetailsByRecordIdResponse, getTeamDetailsResponse } from '@/types/response';
import { Coordinate, RecordDetail } from '@/types/model';

type Props = {
  recordRes: getRecordDetailsByRecordIdResponse;
  teamRes: getTeamDetailsResponse;
  recordId: string;
};

export default function EditableRecordClient({ recordRes, teamRes, recordId }: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEndIndex, setSelectedEndIndex] = useState(0);
  const [selectedShotIndex, setSelectedShotIndex] = useState(0);
  const [editedRecord, setEditedRecord] = useState<RecordDetail>(recordRes.record);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const onEndSelect = (endIndex: number) => {
    setSelectedEndIndex(endIndex);
    setSelectedShotIndex(0);
  };

  const onShotSelect = (shotIndex: number) => {
    setSelectedShotIndex(shotIndex);
  };

  const handleStonePositionChange = (
    endIndex: number, 
    shotIndex: number, 
    isFriendStone: boolean, 
    newPosition: Coordinate
  ) => {
    setEditedRecord(prevRecord => {
      const newEndsData = [...prevRecord.ends_data];
      const targetShot = newEndsData[endIndex].shots[shotIndex];
      const stoneKey = isFriendStone ? 'friend_stones' : 'enemy_stones';
      const newStones = [...targetShot.stones[stoneKey]];
      const stoneIndex = newStones.findIndex(stone => stone.index === newPosition.index);
      
      if (stoneIndex !== -1) { // 既に存在する石の場合
        newStones.map((stone, index) => {
          if (index === stoneIndex) {
            return newPosition;
          } else {
            return stone;
          }
        }
        );
      } else {
        newStones.push(newPosition);
      }

      targetShot.stones[stoneKey] = newStones;
      return { ...prevRecord, ends_data: newEndsData };
    });
  };

  const handleSave = () => {
    // TODO: Implement API call to save changes
    console.log('Saving changes:', editedRecord);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditedRecord(recordRes.record);
    setIsEditMode(false);
  };

  return (
    <div className="w-full h-full overflow-hidden mx-4 my-4">
      <RecordHeader record={editedRecord} friendTeamName={teamRes.team.name} toggleEditMode={toggleEditMode} isEditMode={isEditMode} handleCancel={handleCancel} handleSave={handleSave} />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-8 h-full">
        <div className="lg:col-span-3 space-y-8">
          <ScoreBoardSection
          record={editedRecord}
          friendTeamName={teamRes.team.name}
          onEndSelect={onEndSelect}
          selectedEndIndex={selectedEndIndex}
          isEditMode={isEditMode}
          />
          <MatchDetailsSection
            record={editedRecord}
            isEditMode={isEditMode}
          />
        </div>
        <div className='lg:col-span-2 h-full'>
          <StonePositionsSection
          record={editedRecord}
          selectedEndIndex={selectedEndIndex}
          selectedShotIndex={selectedShotIndex}
          onShotSelect={onShotSelect}
          isEditMode={isEditMode}
          onStonePositionChange={handleStonePositionChange}
          />
        </div>
      </div>


    </div>
  );
}