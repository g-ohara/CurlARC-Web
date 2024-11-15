'use client';

import React, { useState } from 'react';
import RecordHeader from './components/recordHeader';
import ScoreBoardSection from './components/scoreBoardSection';
import MatchDetailsSection from './components/matchDetailsSection';
import StonePositionsSection from './components/stonePositionsSection';
import { getRecordDetailsByRecordIdResponse, getTeamDetailsResponse } from '@/types/response';
import { RecordDetail } from '@/types/model';
import { updateRecord } from '@/lib/api/record';
import { updateRecordRequest } from '@/types/request';
import { SHEET_CONSTANTS } from './components/sheet/constants';
import RecordFooter from './components/recordFooter';

type Props = {
  recordRes: getRecordDetailsByRecordIdResponse;
  teamRes: getTeamDetailsResponse;
  recordId: string;
};

export default function EditableRecordClient({ recordRes, teamRes, recordId }: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedRecord, setEditedRecord] = useState<RecordDetail>(recordRes.record);

  // If the record has no shots, create a new one.
  if (!editedRecord.ends_data || editedRecord.ends_data.length === 0) {
    const record = editedRecord;
    const newStone = {
      index: 0,
      ...SHEET_CONSTANTS.INITIAL_STONE_POSITION,
    };
    const new_end = {
      score: 0,
      shots: [
        {
          type: '',
          success_rate: 0,
          shooter: '',
          stones: {
            friend_stones: record.is_first ? [newStone] : [],
            enemy_stones: record.is_first ? [] : [newStone],
          },
        },
      ],
    }
    record.ends_data = [new_end];
    setEditedRecord(record);
  }

  // Select the latest end and shot
  const latestEndIndex = editedRecord.ends_data.length - 1;
  const latestEnd = editedRecord.ends_data[latestEndIndex];
  const latestShotIndex = latestEnd.shots.length - 1;
  const [selectedEndIndex, setSelectedEndIndex] = useState(latestEndIndex);
  const [selectedShotIndex, setSelectedShotIndex] = useState(latestShotIndex);

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

  const handleIsFirstChange = (isFirst: boolean) => {
    setEditedRecord(prevRecord => {
      return { ...prevRecord, is_first: isFirst };
    });
  }

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
    const req: updateRecordRequest = {
      result: editedRecord.result,
      enemy_team_name: editedRecord.enemy_team_name,
      place: editedRecord.place,
      date: editedRecord.date,
      ends_data: editedRecord.ends_data,
      is_first: editedRecord.is_first,
      is_public: editedRecord.is_public
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
      <RecordHeader record={editedRecord} friendTeamName={teamRes.team.name} />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-8">
        <div className="lg:col-span-3 space-y-8">
          <ScoreBoardSection
            record={editedRecord}
            friendTeamName={teamRes.team.name}
            onEndSelect={onEndSelect}
            selectedEndIndex={selectedEndIndex}
            handleIsFirstChange={handleIsFirstChange}
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
            setRecord={setEditedRecord}
            selectedEndIndex={selectedEndIndex}
            setSelectedEndIndex={setSelectedEndIndex}
            selectedShotIndex={selectedShotIndex}
            setSelectedShotIndex={setSelectedShotIndex}
            isEditMode={isEditMode}
          />
        </div>
      </div>
      <RecordFooter record={editedRecord} toggleEditMode={toggleEditMode} isEditMode={isEditMode} handleSave={handleSave}/>
    </div>
  );
}
