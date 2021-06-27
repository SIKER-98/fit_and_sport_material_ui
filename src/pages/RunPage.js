import React, {useEffect, useState} from "react";
import {
    Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow, TextField
} from "@material-ui/core";
import {connect} from "react-redux";
import { apiRunAdd, apiRunDelete, apiRunUpdate} from "../redux/thunk/runOperations";
import {Delete, Edit} from "@material-ui/icons";
import Button from "@material-ui/core/Button";

import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    SplineSeries,
    AreaSeries,
    Legend,
    Title,
    Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import {ValueScale, EventTracker} from '@devexpress/dx-react-chart';


const RunPage = ({runs, user, addRun, delRun, editRun}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {

    })

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Paper>
                <DialogRunAdd
                    variant={'ADD'}
                    userId={user.userId}
                    addRun={addRun}
                />

                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align={"center"}>Id</TableCell>
                                <TableCell align={'center'}>Time</TableCell>
                                <TableCell align={'center'}>Distance</TableCell>
                                <TableCell align={'center'}>Actions</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {runs.runStatistics.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        <TableCell align={'center'}>{index}</TableCell>
                                        <TableCell
                                            align={'center'}>{new Date(row.time * 1000).toISOString().substr(11, 8)}</TableCell>
                                        <TableCell align={'center'}>{(row.distance / 1000).toFixed(3)} km</TableCell>
                                        <TableCell align={'center'}>
                                            <DialogRunAdd
                                                variant={'EDIT'}
                                                userId={user.userId}
                                                editRun={editRun}
                                                runScoreId={row.id}
                                                distance={row.distance}
                                                time={row.time}
                                            />

                                            <IconButton onClick={() => delRun({runScoreId: row.id})}>
                                                <Delete/>
                                            </IconButton>

                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={runs.runStatistics.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

            <Paper>
                <Chart
                    data={runs.runStatistics}
                >
                    <ValueScale name="distance"/>
                    <ValueScale name="time"/>

                    <ArgumentAxis/>
                    <ValueAxis scaleName="time" showGrid={false} showLine showTicks/>
                    <ValueAxis scaleName="distance" position="right" showGrid={true} showLine showTicks/>

                    <AreaSeries
                        name="Distance"
                        valueField="distance"
                        argumentField="id"
                        scaleName="distance"
                    />

                    <SplineSeries
                        name="Time"
                        valueField="time"
                        argumentField="id"
                        scaleName="time"
                    />

                    <EventTracker/>
                    <Tooltip/>

                    <Legend/>
                    <Title text={'Your Running Results'}/>
                </Chart>
            </Paper>
        </>
    )
}

const DialogRunAdd = ({variant, userId, addRun, editRun, time, distance, runScoreId}) => {
    const [open, setOpen] = useState(false)
    const [newTime, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })
    const [newDistance, setDistance] = useState(0)

    // const handleChange = (event) => {
    //     console.log(event.target.value)
    // }
    //
    // const handleClickOpen = () => {
    //     setOpen(true)
    // }

    const handleClickClose = (save) => {
        if (save) {
            console.log(newTime)
            if (variant === 'ADD') {
                addRun({
                    userId,
                    distance: newDistance,
                    time: (newTime.hours * 3600 + newTime.minutes * 60 + newTime.seconds)
                })
            } else if (variant === 'EDIT') {
                editRun({
                    userId,
                    runScoreId,
                    distance: newDistance,
                    time: (newTime.hours * 3600 + newTime.minutes * 60 + newTime.seconds)
                })
            }
        }

        setOpen(false)
    }

    const handleTimeChange = (event) => {
        setTime({...newTime, [event.target.name]: event.target.value * 1})
    }

    return (
        <>
            {variant === 'ADD' &&
            <Button
                variant={"contained"}
                color={'primary'}
                fullWidth
                onClick={() => setOpen(true)}
            >
                Add Statistic
            </Button>
            }

            {variant === 'EDIT' &&
            <IconButton onClick={() => setOpen(true)}>
                <Edit/>
            </IconButton>
            }


            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClickClose}>
                <DialogTitle>Add Run Statistic</DialogTitle>
                <DialogContent>

                    <TextField
                        autoComplete={'off'}
                        name={'hours'}
                        variant={'standard'}
                        type={'number'}
                        required
                        fullWidth
                        defaultValue={time ? Math.floor(time / 3600) : 0}
                        label={'Hours'}
                        onChange={handleTimeChange}
                    />

                    <TextField
                        autoComplete={'off'}
                        name={'minutes'}
                        variant={'standard'}
                        type={'number'}
                        required
                        fullWidth
                        defaultValue={time ? Math.floor((time - Math.floor(time / 3600) * 3600) / 60) : 0}
                        label={'Minutes'}
                        onChange={handleTimeChange}
                    />
                    <TextField
                        autoComplete={'off'}
                        name={'seconds'}
                        variant={'standard'}
                        type={'number'}
                        required
                        fullWidth
                        defaultValue={time ? time % 60 : 0}
                        label={'Second'}
                        onChange={handleTimeChange}
                    />


                    <TextField
                        autoComplete={'off'}
                        name={'distance'}
                        variant={'standard'}
                        type={'number'}
                        required
                        defaultValue={distance || 0}
                        fullWidth
                        label={'Distance'}
                        onChange={(e) => setDistance(e.target.value)}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => handleClickClose(false)} color={'primary'}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleClickClose(true)} color={'primary'}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


const mapStateToProps = state => ({
    user: state.user,
    runs: state.runStat
})

const mapDispatchToProps = dispatch => ({
    addRun: item => dispatch(apiRunAdd(item)),
    delRun: item => dispatch(apiRunDelete(item)),
    editRun: item => dispatch(apiRunUpdate(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(RunPage)
