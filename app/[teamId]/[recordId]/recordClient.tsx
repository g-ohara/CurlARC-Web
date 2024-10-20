'use client';

import React, { useState } from 'react';
import RecordHeader from './components/recordHeader';
import ScoreBoardSection from './components/scoreBoardSection';
import MatchDetailsSection from './components/matchDetailsSection';
import StonePositionsSection from './components/stonePositionsSection';
import { getRecordDetailsByRecordIdResponse, getTeamDetailsResponse } from '@/types/response';
import { Coordinate, RecordDetail } from '@/types/model';
import { updateRecord } from '@/lib/api/record';
import { updateRecordRequest } from '@/types/request';

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

  // If the record has no shots, create a new one.
  if (!editedRecord.ends_data || editedRecord.ends_data.length === 0) {
    const record = editedRecord;
    const new_end = {
      score: 0,
      shots: [
        {
          type: '',
          success_rate: 0,
          shooter: '',
          stones: {
            friend_stones: [],
            enemy_stones: [],
          },
        },
      ],
    }
    record.ends_data = [new_end];
    setEditedRecord(record);
  }

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
      console.log("newPosition", newPosition);
      const newEndsData = [...prevRecord.ends_data];
      const targetShot = newEndsData[endIndex].shots[shotIndex];
      const stoneKey = isFriendStone ? 'friend_stones' : 'enemy_stones';
      const oldStones = [...targetShot.stones[stoneKey]];
      const stoneExists = oldStones.some(stone => stone.index === newPosition.index);

      let newStones;

      // Add or move a stone.
      if (stoneExists) { // 既に存在する石の場合
        newStones = oldStones.map((stone) => {
          if (stone.index === newPosition.index) {
            return newPosition;
          } else {
            return stone;
          }
        }
        );
      } else {
        console.log("added:")
        newStones = [...oldStones, newPosition];
      }

      // Update stones in current shot
      targetShot.stones[stoneKey] = newStones;

      // Update stones in next shot
      const nextShotIndex = shotIndex + 1;
      if (nextShotIndex < newEndsData[endIndex].shots.length) {
        const nextShot = newEndsData[endIndex].shots[nextShotIndex];
        nextShot.stones[stoneKey] = newStones;
      }

      return { ...prevRecord, ends_data: newEndsData };
    });
  };

  const handleShotsDetailsChange = (
    endIndex: number,
    shotIndex: number,
    field: string,
    value: string | number
  ) => {
    setEditedRecord(prevRecord => {
      const newRecord = { ...prevRecord }
      const newEndsData = [...newRecord.ends_data]
      const newShots = [...newEndsData[endIndex].shots]

      newShots[shotIndex] = {
        ...newShots[shotIndex],
        [field]: value
      }

      newEndsData[endIndex] = {
        ...newEndsData[endIndex],
        shots: newShots
      }

      newRecord.ends_data = newEndsData

      return newRecord
    })
  }

  const handleSave = () => {
    // TODO: Implement API call to save changes
    console.log('Saving changes:', editedRecord);
    const req: updateRecordRequest = {
      result: editedRecord.result,
      enemy_team_name: editedRecord.enemy_team_name,
      place: editedRecord.place,
      date: editedRecord.date,
      ends_data: editedRecord.ends_data,
      isPublic: editedRecord.is_public
    }
    updateRecord(recordId, req);
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
            selectedEndIndex={selectedEndIndex}
            selectedShotIndex={selectedShotIndex}
            onShotSelect={onShotSelect}
            isEditMode={isEditMode}
            onShotsDetailsChange={handleShotsDetailsChange}
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
