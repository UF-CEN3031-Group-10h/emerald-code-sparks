import React, { useState, useEffect } from 'react';

import { Tabs, Table, Popconfirm, message } from 'antd';
import Navbar from '../../components/NavBar/NavBar';
import { QuestionCircleOutlined } from '@ant-design/icons';

import UnitCreator from './UnitCreator/UnitCreator';
import LearningStandardDayCreator from './LearningStandardCreator/LearningStandardCreator';
import {
  getLearningStandardAll,
  deleteLearningStandard,
  getGrades,
  getCCWorkspaces,
  deleteCCWorkspace,
} from '../../Utils/requests';
import UnitEditor from './UnitEditor/UnitEditor';
import LessonEditor from './LessonEditor/LessonEditor';
import { useSearchParams } from 'react-router-dom';

import './ContentCreator.less';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;

export default function ContentCreator() {
  const [gradeList, setGradeList] = useState([]);
  const [learningStandardList, setLearningStandardList] = useState([]);
  const [workspaceList, setWorkspaceList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [tab, setTab] = useState(
    searchParams.has('tab') ? searchParams.get('tab') : 'home'
  );
  const [page, setPage] = useState(
    searchParams.has('page') ? parseInt(searchParams.get('page')) : 1
  );
  const [viewing, setViewing] = useState(parseInt(searchParams.get('day')));

  useEffect(() => {
    const fetchData = async () => {
      const [lsResponse, gradeResponse, wsResponse] = await Promise.all([
        getLearningStandardAll(),
        getGrades(),
        getCCWorkspaces(),
      ]);
      setLearningStandardList(lsResponse.data);

      const grades = gradeResponse.data;
      grades.sort((a, b) => (a.id > b.id ? 1 : -1));
      setGradeList(grades);

      setWorkspaceList(wsResponse.data);
      console.log(wsResponse.data);
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      editable: true,
      width: '22.5%',
      align: 'left',
      render: (_, key) => (
        <UnitEditor id={key.unit.id} unitName={key.unit.name} linkBtn={true} />
      ),
    },
    {
      title: 'Lesson',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      width: '22.5%',
      align: 'left',
      render: (_, key) => (
        <LessonEditor
          learningStandard={key}
          linkBtn={true}
          viewing={viewing}
          setViewing={setViewing}
          tab={tab}
          page={page}
        />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'expectations',
      key: 'character',
      editable: true,
      width: '22.5%',
      align: 'left',
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      width: '10%',
      align: 'right',
      render: (_, key) => (
        <Popconfirm
          title={'Are you sure you want to delete this learning standard?'}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={async () => {
            const res = await deleteLearningStandard(key.id);
            if (res.err) {
              message.error(res.err);
            } else {
              setLearningStandardList(
                learningStandardList.filter((ls) => {
                  return ls.id !== key.id;
                })
              );
              message.success('Delete success');
            }
          }}
        >
          <button id={'link-btn'}>Delete</button>
        </Popconfirm>
      ),
    },
  ];

  const filterLS = (grade) => {
    return learningStandardList.filter((learningStandard) => {
      return learningStandard.unit.grade === grade.id;
    });
  };

  const setTabs = (grade) => {
    return (
      <TabPane tab={grade.name} key={grade.name}>
        <div id='page-header'>
          <h1>Lessons & Units</h1>
        </div>
        <div id='content-creator-table-container'>
          <div id='content-creator-btn-container'>
            <UnitCreator gradeList={gradeList} />
            <LearningStandardDayCreator />
          </div>
          <Table
            columns={columns}
            dataSource={filterLS(grade)}
            rowClassName='editable-row'
            rowKey='id'
            onChange={(Pagination) => {
              setViewing(undefined);
              setPage(Pagination.current);
              setSearchParams({ tab, page: Pagination.current });
            }}
            pagination={{ current: page ? page : 1 }}
          ></Table>
        </div>
      </TabPane>
    );
  };

  const wsColumn = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      width: '30%',
      align: 'left',
      render: (_, key) => key.name,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      editable: true,
      width: '40%',
      align: 'left',
      render: (_, key) => key.description,
    },
    {
      title: 'Open Workspace',
      dataIndex: 'open',
      key: 'open',
      editable: false,
      width: '20%',
      align: 'left',
      render: (_, key) => (
        <Link
          onClick={() =>
            localStorage.setItem('sandbox-day', JSON.stringify(key))
          }
          to={'/sandbox'}
        >
          Open
        </Link>
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      width: '10%',
      align: 'right',
      render: (_, key) => (
        <Popconfirm
          title={'Are you sure you want to delete this workspace?'}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={async () => {
            const res = await deleteCCWorkspace(key.id);
            if (res.err) {
              message.error(res.err);
            } else {
              setWorkspaceList(
                workspaceList.filter((ws) => {
                  return ws.id !== key.id;
                })
              );
              message.success('Delete success');
            }
          }}
        >
          <button id={'link-btn'}>Delete</button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className='container nav-padding'>
      <Navbar />
      <div id='main-header'>Welcome Content Creator</div>

      <Tabs
        onChange={(activeKey) => {
          setTab(activeKey);
          setPage(1);
          setViewing(undefined);
          setSearchParams({ tab: activeKey });
        }}
        activeKey={tab ? tab : 'home'}
      >
        <TabPane tab='Home' key='home'>
          <div id='page-header'>
            <h1>Lessons & Units</h1>
          </div>
          <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
              <UnitCreator gradeList={gradeList} />
              <LearningStandardDayCreator
                setLearningStandardList={setLearningStandardList}
                viewing={viewing}
                setViewing={setViewing}
                tab={tab}
                page={page}
              />
            </div>
            <Table
              columns={columns}
              dataSource={learningStandardList}
              rowClassName='editable-row'
              rowKey='id'
              onChange={(Pagination) => {
                setViewing(undefined);
                setPage(Pagination.current);
                setSearchParams({ tab, page: Pagination.current });
              }}
              pagination={{ current: page ? page : 1 }}
            ></Table>
          </div>
        </TabPane>

        {gradeList.map((grade) => {
          return setTabs(grade);
        })}

        <TabPane tab='Saved Workspaces' key='workspace'>
          <div id='page-header'>
            <h1>Saved Worksapces</h1>
          </div>
          <div
            id='content-creator-table-container'
            style={{ marginTop: '6.6vh' }}
          >
            <Table
              columns={wsColumn}
              dataSource={workspaceList}
              rowClassName='editable-row'
              rowKey='id'
              onChange={(Pagination) => {
                setViewing(undefined);
                setPage(Pagination.current);
                setSearchParams({ tab, page: Pagination.current });
              }}
              pagination={{ current: page ? page : 1 }}
            ></Table>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}