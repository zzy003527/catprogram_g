<template>
    <el-card class="box-card">
        <div class="bookMsgAll">
            <div class="demo-collapse">
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="笔试" name="1">
                        <div class="addBookTime">
                            <el-button type="primary" @click="clickAddTimeBtn(1)">添加预约时间
                            </el-button>
                        </div>
                        <div class="demo-collapse-two">
                            <el-collapse v-model="activeNames2" @change="handleChange2">

                                <el-collapse-item :name="timeObj.id" v-for="(timeObj, index) in timeListAll.timeListOne"
                                    :key="timeObj.id">
                                    <template #title>
                                        <div>{{ timeObj.time }}</div>
                                        <div class="elCollapseItem">
                                            <el-button type="primary" @click.stop.prevent="() => { }"
                                                @click="deleteBookTimeFn(timeObj.time, index, 1)">删除该预约时间</el-button>
                                        </div>
                                    </template>
                                    <div class="changeBookNum">
                                        <el-button type="primary"
                                            @click="changeAvailableNumberFn(timeObj.time, '1', index)">
                                            修改预约人数
                                        </el-button>
                                        <span>已经预约的人数:{{ timeObj.number }} 可预约人数:{{ timeObj.availableNumber }}</span>
                                    </div>
                                    <div class="demo-collapse-three">
                                        <el-collapse v-model="activeNames3" @change="handleChange3">
                                            <el-collapse-item :title="timeObj.name" :name="timeObj.id"
                                                v-for="(timeObj) in  bookUserListAll.userListOne[index]"
                                                :key="timeObj.id">
                                                <div class="userObjMsg">
                                                    <span>姓名：{{ timeObj.name }} </span>
                                                    <span>性别：{{ timeObj.sex }}</span>
                                                    <span>学号:{{ timeObj.id }}</span>
                                                    <span>邮箱：{{ timeObj.email }}</span>
                                                </div>

                                            </el-collapse-item>
                                        </el-collapse>
                                    </div>


                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="面试" name="2">
                        <div class="addBookTime">
                            <el-button type="primary" @click="clickAddTimeBtn(2)">添加预约时间
                            </el-button>
                        </div>
                        <div class="demo-collapse-two">
                            <el-collapse v-model="activeNames2" @change="handleChange2">

                                <el-collapse-item :name="timeObj.id" v-for="(timeObj, index) in timeListAll.timeListTwo"
                                    :key="timeObj.id">
                                    <template #title>
                                        <div>{{ timeObj.time }}</div>
                                        <div class="elCollapseItem">
                                            <el-button type="primary" @click.stop.prevent="() => { }"
                                                @click="deleteBookTimeFn(timeObj.time, index, 2)">删除该预约时间</el-button>
                                        </div>
                                    </template>
                                    <div class="changeBookNum">
                                        <el-button type="primary"
                                            @click="changeAvailableNumberFn(timeObj.time, '1', index)">
                                            修改预约人数
                                        </el-button>
                                        <span>已经预约的人数:{{ timeObj.availableNumber }} 可预约人数:{{ timeObj.number }}</span>
                                    </div>
                                    <div class="demo-collapse-three">
                                        <el-collapse v-model="activeNames3" @change="handleChange3">
                                            <el-collapse-item :title="timeObj.name" :name="timeObj.id"
                                                v-for="(timeObj) in  bookUserListAll.userListTwo[index]"
                                                :key="timeObj.id">
                                                <div class="userObjMsg">
                                                    <span>姓名：{{ timeObj.name }} </span>
                                                    <span>性别：{{ timeObj.sex }}</span>
                                                    <span>学号:{{ timeObj.id }}</span>
                                                    <span>邮箱：{{ timeObj.email }}</span>
                                                </div>

                                            </el-collapse-item>
                                        </el-collapse>
                                    </div>


                                </el-collapse-item>
                            </el-collapse>
                        </div>

                    </el-collapse-item>
                    <el-collapse-item title="一轮考核" name="3">
                        <div class="addBookTime">
                            <el-button type="primary" @click="clickAddTimeBtn(3)">添加预约时间
                            </el-button>
                        </div>
                        <div class="demo-collapse-two">
                            <el-collapse v-model="activeNames2" @change="handleChange2">

                                <el-collapse-item :name="timeObj.id"
                                    v-for="(timeObj, index) in timeListAll.timeListThree" :key="timeObj.id">
                                    <template #title>
                                        <div>{{ timeObj.time }}</div>
                                        <div class="elCollapseItem">
                                            <el-button type="primary" @click.stop.prevent="() => { }"
                                                @click="deleteBookTimeFn(timeObj.time, index, 3)">删除该预约时间</el-button>
                                        </div>
                                    </template>
                                    <div class="changeBookNum">
                                        <el-button type="primary"
                                            @click="changeAvailableNumberFn(timeObj.time, '1', index)">
                                            修改预约人数
                                        </el-button>
                                        <span>已经预约的人数:{{ timeObj.number }} 可预约人数:{{ timeObj.availableNumber }}</span>
                                    </div>
                                    <div class="demo-collapse-three">
                                        <el-collapse v-model="activeNames3" @change="handleChange3">
                                            <el-collapse-item :title="timeObj.name" :name="timeObj.id"
                                                v-for="(timeObj) in  bookUserListAll.userListThree[index]"
                                                :key="timeObj.id">
                                                <div class="userObjMsg">
                                                    <span>姓名：{{ timeObj.name }} </span>
                                                    <span>性别：{{ timeObj.sex }}</span>
                                                    <span>学号:{{ timeObj.id }}</span>
                                                    <span>邮箱：{{ timeObj.email }}</span>
                                                </div>

                                            </el-collapse-item>
                                        </el-collapse>
                                    </div>


                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="二轮考核" name="4">
                        <div class="addBookTime">
                            <el-button type="primary" @click="clickAddTimeBtn(4)">添加预约时间
                            </el-button>
                        </div>
                        <div class="demo-collapse-two">
                            <el-collapse v-model="activeNames2" @change="handleChange2">

                                <el-collapse-item :name="timeObj.id"
                                    v-for="(timeObj, index) in timeListAll.timeListFour" :key="timeObj.id">
                                    <template #title>
                                        <div>{{ timeObj.time }}</div>
                                        <div class="elCollapseItem">
                                            <el-button type="primary" @click.stop.prevent="() => { }"
                                                @click="deleteBookTimeFn(timeObj.time, index, 4)">删除该预约时间</el-button>
                                        </div>
                                    </template>
                                    <div class="changeBookNum">
                                        <el-button type="primary"
                                            @click="changeAvailableNumberFn(timeObj.time, '1', index)">
                                            修改预约人数
                                        </el-button>
                                        <span>已经预约的人数:{{ timeObj.number }} 可预约人数:{{ timeObj.availableNumber }}</span>
                                    </div>
                                    <div class="demo-collapse-three">
                                        <el-collapse v-model="activeNames3" @change="handleChange3">
                                            <el-collapse-item :title="timeObj.name" :name="timeObj.id"
                                                v-for="(timeObj) in  bookUserListAll.userListFour[index]"
                                                :key="timeObj.id">
                                                <div class="userObjMsg">
                                                    <span>姓名：{{ timeObj.name }} </span>
                                                    <span>性别：{{ timeObj.sex }}</span>
                                                    <span>学号:{{ timeObj.id }}</span>
                                                    <span>邮箱：{{ timeObj.email }}</span>
                                                </div>

                                            </el-collapse-item>
                                        </el-collapse>
                                    </div>


                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                <el-dialog v-model="dialogVisible2" width="30%" draggable>
                    <div>修改预约人数</div>
                    <el-input-number v-model="changeNum" :min="1" @change="handleChange" />
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogVisible2 = false">取消</el-button>
                            <el-button type="primary" @click="sureAvailableNumberFn">修改</el-button>
                        </span>
                    </template>
                </el-dialog>
                <div class="addBookTime">

                    <el-dialog v-model="dialogVisible" width="30%" draggable>

                        <span class="demonstration">选择想要添加的时间</span>
                        <div class="block">

                            <el-date-picker v-model="startTime" type="datetime" placeholder="选择开始时间"
                                value-format="YYYY-MM-DD hh:mm:ss" format="YYYY/MM/DD hh:mm:ss"
                                :disabledDate="disabledDate" />
                            <el-date-picker v-model="endTime" type="datetime" placeholder="选择结束时间"
                                value-format="YYYY-MM-DD hh:mm:ss" format="YYYY/MM/DD hh:mm:ss"
                                :disabledDate="disabledDate2" />
                        </div>
                        <div>可预约人数</div>
                        <el-input-number v-model="addBookNum" :min="1" :max="100" />


                        <!-- <el-date-picker v-model="value2" type="datetimerange" range-separator="To"
                                :disabledDate="disabledDate" start-placeholder="开始时间" end-placeholder="结束时间" /> -->

                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="addTimeFnCancel">取消</el-button>
                                <el-button type="primary" @click="addTimeFn(checkVersionAddTime)">添加</el-button>
                            </span>
                        </template>
                    </el-dialog>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script lang='ts' setup>
import { ref, reactive } from 'vue'
import { book, handleError, addTime, changeNumRequest, deleteTime } from '../../request/requestApi'
import { ElMessage } from 'element-plus'
//最前面的第一轮面板
const activeNames = ref([])
const handleChange = (val: string[]) => {
    console.log(val)
}
//深入的时间表面板
const activeNames2 = ref([])
const handleChange2 = (val: string[]) => {
    console.log(val)
}
//时间表深入的具体预约人
const activeNames3 = ref([])
const handleChange3 = (val: string[]) => {
    console.log(val)
}
//预约时间列表
type timeListItem = {
    time: string,
    id: string,
    number: number,
    availableNumber: number
}
interface timeListAllType {
    timeListOne: timeListItem[],
    timeListTwo: timeListItem[],
    timeListThree: timeListItem[],
    timeListFour: timeListItem[],
}
let timeListAll: timeListAllType = reactive({
    timeListOne: [],
    timeListTwo: [],
    timeListThree: [],
    timeListFour: [],
})
//预约时间下面的预约人数列表
type userListOneType = {
    name: string,
    id: string,
    sex: string,
    email: string
}
interface bookUserListAllType {
    userListOne: Array<userListOneType[]>,
    userListTwo: Array<userListOneType[]>,
    userListThree: Array<userListOneType[]>,
    userListFour: Array<userListOneType[]>
}
let bookUserListAll: bookUserListAllType = reactive({
    userListOne: [],
    userListTwo: [],
    userListThree: [],
    userListFour: []
})
console.log(timeListAll, bookUserListAll);

console.log(book);
//调用获取预约人数的接口
book({
    'version': 1
}).then((res) => {
    console.log(res);
    timeList(res, 1);
    console.log('1111');

    return res
})
    .catch(handleError);
book({
    'version': 2
}).then((res) => {
    console.log(res);
    timeList(res, 2);
    console.log('1111');

    return res
})
    .catch(handleError);
book({
    'version': 3
}).then((res) => {
    console.log(res);
    timeList(res, 3);
    console.log('1111');

    return res
})
    .catch(handleError);
book({
    'version': 4
}).then((res) => {
    console.log(res);
    timeList(res, 4);
    console.log('1111');

    return res
})
    .catch(handleError);
//传入获取预约信息接口返回的信息，将不同的时间放入不用的时间列表
function timeList(bookMsg, version: number) {
    console.log('2222');
    if (bookMsg.resultStatus !== "200") {
        return null;

    }
    //根据返回的数据循环生成时间刘表和时间里面的预约人列表
    //第一层for循环生成时间列表
    for (let i = 0; i < bookMsg.obj.length; i++) {
        let timeListItem = {
            time: bookMsg.obj[i].timetable.timeQuantum,
            id: bookMsg.obj[i].timetable.id,
            number: bookMsg.obj[i].timetable.number,
            availableNumber: bookMsg.obj[i].timetable.availableNumber
        }
        let userListA: userListOneType[] = [];
        for (let j = 0; j < bookMsg.obj[i].users.length; j++) {
            let userListItem = {
                name: bookMsg.obj[i].users[j].username,
                id: bookMsg.obj[i].users[j].studentId,
                sex: bookMsg.obj[i].users[j].sex,
                email: bookMsg.obj[i].users[j].email
            }
            userListA.push(userListItem);


        } if (version == 1) {
            bookUserListAll.userListOne.push(userListA)
        } else if (version == 2) {
            bookUserListAll.userListTwo.push(userListA)
        } else if (version == 3) {
            bookUserListAll.userListThree.push(userListA)
        } else if (version == 4) {
            bookUserListAll.userListFour.push(userListA)
        }

        console.log(timeListItem);
        if (version == 1) {
            timeListAll.timeListOne.push(timeListItem)
        } else if (version == 2) {
            timeListAll.timeListTwo.push(timeListItem)
        } else if (version == 3) {
            timeListAll.timeListThree.push(timeListItem)
        } else if (version == 4) {
            timeListAll.timeListFour.push(timeListItem)
        }

    }
    console.log(timeListAll.timeListOne);


}
//添加预约时间提交按钮
const addBookNum = ref(1) //可预约的人数
const startTime = ref('')
const endTime = ref('')
const checkVersionAddTime = ref()
const dialogVisible = ref(false)
function clickAddTimeBtn(version: number) {
    dialogVisible.value = true;
    checkVersionAddTime.value = version
}
function addTimeFn(version: number) {
    dialogVisible.value = false
    // 获取当前时间并且提交
    let addTimeSumit = addTime({
        version: version,
        time: `${startTime.value}~${endTime.value}`,
        number: addBookNum.value
    }).then((res) => {
        console.log(res);
        let timeListItem = {
            time: `${startTime.value}~${endTime.value}`,
            id: 'newSubit',
            number: 0,
            availableNumber: addBookNum.value


        };
        if (version == 1) {
            timeListAll.timeListOne.push(timeListItem)
        } else if (version == 2) {
            timeListAll.timeListTwo.push(timeListItem)
        } else if (version == 3) {
            timeListAll.timeListThree.push(timeListItem)
        } else if (version == 4) {
            timeListAll.timeListFour.push(timeListItem)
        }
        //添加完之后清空预约时间数据
        startTime.value = ''
        endTime.value = ''
        addBookNum.value = 1


        return res
    })
        .catch(handleError);
    console.log(addTimeSumit);

}
console.log(addTime);

console.log(timeList);
//点击取消预约时间
function addTimeFnCancel() {
    dialogVisible.value = false;
    //添加完之后清空预约时间数据
    startTime.value = ''
    endTime.value = ''
    addBookNum.value = 1

}




// 日维度
function disabledDate(time) {
    return time.getTime() < Date.now() - 8.64e7;

}
function disabledDate2(time) {
    return time.getTime() < new Date(startTime.value).getTime() - 8.64e7;

}
//修改预约人数
const sucessBook = () => {
    ElMessage({
        message: '修改预约人数成功',
        type: 'success',
    })
}
const dialogVisible2 = ref(false)
const changeAvailableTime = ref('')
const changeAvailableVersion = ref('')
const changeNum = ref(1)
const changeNumTimeListIndex = ref(1)
function changeAvailableNumberFn(time: string, version: string, index: number) {
    dialogVisible2.value = true;
    changeAvailableTime.value = time
    changeAvailableVersion.value = version
    changeNumTimeListIndex.value = index
}
function sureAvailableNumberFn() {
    dialogVisible2.value = false
    changeNumRequest({
        version: changeAvailableVersion.value,
        time: changeAvailableTime.value,
        number: changeNum.value
    }).then((res) => {
        console.log(res);
        sucessBook()
        if (changeAvailableVersion.value == '0') {
            timeListAll.timeListOne[changeNumTimeListIndex.value].availableNumber = changeNum.value
        } else if (changeAvailableVersion.value == '1') {
            timeListAll.timeListTwo[changeNumTimeListIndex.value].availableNumber = changeNum.value
        } else if (changeAvailableVersion.value == '2') {
            timeListAll.timeListThree[changeNumTimeListIndex.value].availableNumber = changeNum.value
        } else if (changeAvailableVersion.value == '3') {
            timeListAll.timeListFour[changeNumTimeListIndex.value].availableNumber = changeNum.value
        }
        changeNumTimeListIndex.value
        return res
    })
        .catch((err) => {
            console.log(err);
            const failBook = () => {
                ElMessage({
                    message: err.resultIns,
                    type: 'success',
                })
            }
            failBook()
        });


}
//删除预约时间
function deleteBookTimeFn(time: string, index: number, version: number) {

    deleteTime({
        time: time,

    }).then((res) => {
        console.log(res);
        if (version == 1) {
            timeListAll.timeListOne.splice(index, 1)
        } else if (version == 2) {
            timeListAll.timeListTwo.splice(index, 1)
        } else if (version == 3) {
            timeListAll.timeListThree.splice(index, 1)
        } else if (version == 4) {
            timeListAll.timeListFour.splice(index, 1)
        }
        timeListAll.timeListOne.splice(index, 1)
        const sucessDelete = () => {
            ElMessage({
                message: '删除预约时间成功',
                type: 'success',
            })
        }
        sucessDelete()

        return res
    })
        .catch((err) => {
            console.log(err);

            const failDelete = () => {
                ElMessage.error(`${err.resultIns}`)

            }
            failDelete()
        });

}
</script>
<style scoped>
.demo-collapse {
    width: 1000px;
}

.demo-collapse-two {
    width: 800px;
    margin-left: 100px;
}

.demo-collapse-three {
    width: 600px;
    margin-left: 200px;
}

.userObjMsg {
    display: flex;
    justify-content: space-evenly;
}

.addBookTime {
    display: flex;
}

.block {
    display: flex;
    padding: 0 0 10px;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
    border-right: none;
}

.block .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;

}

.changeBookNum {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 600px;
    margin-left: 200px;
}

.elCollapseItem {
    margin-left: 36px;
}
</style>
<style>
.el-dialog__header {
    height: 20px !important;
}
</style>
