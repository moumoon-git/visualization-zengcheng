<template>
    <!-- 队伍轨迹模块 -->
    <div class="team-route-all-container">
        <!-- 1. 队伍列表主页面 -->
        <div class="team-route-list-container" v-show="displaySwitch==0">
            <!-- 1.1 顶部工具栏 -->
            <div class="team-route-list-tool">
                <span class="date-range-selector-border">
                    <img style="position:absolute;top:-1px;left:-1px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII=">
                    <img style="position:absolute;top:-1px;right:-1px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg==">
                    <img style="position:absolute;bottom:-1px;left:-1px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII=">
                    <img style="position:absolute;bottom:-1px;right:-1px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">
                    <el-date-picker
                        class="date-range-selector"
                        v-model="dateRange"
                        type="daterange"
                        align="right"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        @change="selectDateRange"
                    >
                    </el-date-picker>
                </span>
                <span class="team-route-list-tool-search">
                    <input
                        class="team-route-list-tool-search-inner"
                        placeholder="任务名称、地点、姓名、单位"
                        v-model="queryList.search"
                        @change="getTeamList"
                    >
                    <span class="el-icon-search team-route-list-tool-search-button" @click="getTeamList"></span>
                </span>
            </div>
            <ul style="list-style-type:none;margin-block-start:0em;margin-block-end:0em;padding-inline-start:0px;" class="team-route-list-content" v-infinite-scroll="load">
                <li
                    style="list-style-type:none"
                    class="team-route-list-item"
                    :class="{'team-route-list-item-selected': item.id == selectedId}"
                    v-for="(item, index) in teamList"
                    :key="'teamRoute' + index"
                    @click="selectMan(item.contactorId, $event)"
                >
                    <img style="position:absolute;top:-2px;left:-2px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII=">
                    <img style="position:absolute;top:-2px;right:-2px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg==">
                    <img style="position:absolute;bottom:-2px;left:-2px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII=">
                    <img style="position:absolute;bottom:-2px;right:-2px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">
                    <div class="team-route-list-item-header-background">
                        <div class="team-route-list-item-header">
                            <img @click.stop="calling(item)" class="team-route-list-item-icon-phone" alt="电话icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAhCAYAAAC803lsAAAE4klEQVRYha2Yf2iVVRjHv885773v7u5Go1UUq0C2fihUKPmP0R9mEf1T4SVM7ceYWTDDmiIlFDbDsI1orcIyLDLBLb2MIpJhUWOhRpRWNipK0SIkS6Xd3V1333NOnJf3ncdzz3t3kw48nL3nnh+f93me8zzPO8r/HmCGRlV+VjMtrrV5jnlk9XDAKGNcWWP/CwhZIGSNmSAq4fALAjJBzANZ9MwcMMoSaR1uQttQiZAu0zCHuEBkJFSDhmY0pWdMiDUQC4+EGZpxgcgaQWQ1f7JByILwImHWG2kRFgwch5gQZMBIe67tI6Y29G9p3T+a5cv+ZlivJ2UltmyfEFsiEGFpxPW20phLSZrxLE2YMKE22rO8c5xh/TUCnb5C6bCHt+9v4JcMFMQLAAIHiG0WYZwRRGNk9dMqj9t5jjqSomYN0SqwZnNRfNY9KQ7cEmB5mbCyP8NuMEyXirQXSkeWP5Jr5MPReMowL3P4HGDZ3nZY/qrP1gI42VMUw9FmfM2k+A4Ke0c8escAMYG814piQPe5Br47GuOGOCN1UhwJ/1aEBSmFT3Fug/D3fEGsyzXyQ+/5rO3Bs/LITp9d9TWnubE5MgqFVoE3fuXozzXykXvK6r6HSvJ4ZCY7HFSA2EChcDXt8dMb7PBZm554hcSU3uMgp3lHOZ6xvOMYgKMAZo0xagXwW0L6SAQ559EKv5QIc027nmDkD6VpW0rho9vL8i893lMUewDsMfaQ7/vsysE0DUNhaGNR7E8CiJvprGZQCm/CokC9AsLs0RRdHG/0Uh27F0DDQEF0W443re4AoME0DZHCkDZjuobEyIwJFTmksyR/BPBzXx17Mx6fLdUPesG3Hl2UkItwjJN/Y4AndxfE0zNEXTJBbE2YAShYVVIPA2jbkOGL9JyOkhyDwvcbM+xdx3UMN24VqrRhUow68owLguAwjbRE3FaWf7YIPHvYQ++XHjXpeTsmxGMAWlZkeZcjLrgOdEmFRlz+EWtFR8KgX8cFhf09GfZJdD3FXWW18gzDsifqebuZnw551NSR5V2r6/lSRzlhm3Jai3GpWBHM7GipJdfID0DhZL4glut5mzJ84TceNnOFvbcKtWsK5O3z0K+DYHQjgwUBHl87KQ4C4VXXUo4kMBOnWbPa2bcidOtnHcgA/JEfF0v0mtEUXdrns24QZgHINEvs3DohNIxcmuVPTTE80Czx3NYJsS0BRCSBJMGE/RlCZkUD/wrAqfy4uDtePMapYYLA5wfqtGFaua6e33mE4+XLBVa9XhR5B0iYCKvFEdNP4sXlJoXJwXExTy/INfLPd/msRc+bI9Q/8wN1yi6WeoviY67w1gmOHsf1dd4aF4wNEtrZA87mx8VCKIwOpOnD1fV8iVUonbePINwBhX3VAlrSd43LeT0jpcc976rni49z9Oq8cl2AvvYp+cW1QhX1odvr2NUfpEgXUZc9X5Q3zRGqYJjF9BFVDQQJMLHEz0yngD6fvQjCzVBhcvsphNXPwOlNRbn4+mSIiltTK4wtScWO7W/m4YEdPF3Z19yIjM3McWnUFtVAYEfqhOrfWQbYMHGT1lu68gwZ8EkwFRC1gCQBkQVV7dMUxsH2japZI0kwdiVul5mwtFJx8IVqxASwIeLDZ/r3hW0u5yfnf23mZqZPuGBsTVY2AP8ChXtUJKSdmwwAAAAASUVORK5CYII="/>
                            <img @click.stop="meeting(item)" class="team-route-list-item-icon-meeting" alt="会议icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAFaElEQVRYha1YbYhUVRh+3nPuzN7ZnRU/clOxtoLcfihihBsbpViQ/RCyMcwiqUz/iCFSWmiIJBgZSUVEYAapJegQBmL/LNFCLEIUi9K1dNXNDLWZdmZn7j0n7uy52zuvd3ZN9sC7995zzz33med93o+7lO8JcBODhnjE3syG0fD+x1oSRwhQls1ZMTeiYEgYn+NgbIPzEQMjgShnjcAYZxD3RgQMB6UZmNjiEYMgdj3ibuJsaGGKaSR6eegsmosj44ZBDQeGuycGknLPee6aGCsRgKp71jYQdcOhhlvAmNEMRPqER2NyWb0316q7c1n92V8KzdE8A1vnylyrrtnNgpGijVmJXuiv99VOECbMCLAShJnLmvWH0TyAJrcuxdjT+UKoIksQ/rBgJIiYkZR7WRMI00cbfL2uFB6FxfcgPMDANAmWtBA/JUVkkmaSwlgzMDV2OgOsPuLhjVxWTwXh7seqdoUDYITFWgmZmGVOSmQmCQhnxYt/8epSeOTeAFt8i2sPBdj4Ytn84u4lmRS9Sshf4LUpSSMe2zhyQSTSzJIWvfaqwuOw6AHQX5sntN0VYtvmvnAbgLKbj6ziIixwFjKWDGfLG4IRycrgr7uqML/N4MvZgT1IA+vsnhQ91a2xGMAOkVuGy9rxtZWake7h4uXWt6Bi9z1cNRdjV59T+sC3GpMd6BiISgBCDEidfmI3KSFWzSKn5qJ3M/r+wxrPhsBtIHQAKMLi0uDmhDtqfy1OC4Ga2uzAKOYL4Tzmuip3mydaAwmoxkYuq98D4VEAZ32DU5MNDpWA8T5Q8i3KfYSsAY41AcU/CRMtYELApIG/my3+qBLIzVfcnnHpUKyoktSMBKJzWb0dhK45Vfv88rL5meeQKwR/u69mvtRnvhtk4b9fWrO3MrqrPbTdC/vNSSdozwlZCSJs5CbiL+chvLxFL+5V2PRcv507r2IuOxA1MFsyevYhD68BuAJgzIKKXbeo35yIAf2qqeXVjHofhAyAUaMNdn78T/gmgJKzsog0o4S66yKqV2E9LPbNq5heKcQIyASD/flC+ELK4vieNK3hrL7jqyUgjM8XwgULK3bpVYVnDqboVpGN60StBAhpfleI3Ym1xOJ8L6Fjf1q1VwntKYszPILaDC5Exy/SasphTbOiG2NtnXuuq1HDVu1R1hbrIDjLF8NlvsXlrWlaOc7gh13FcANbgw2lcO/UAFt3pOmVHoXOVWUzf2pgC8ILdUOJF113flzRdFlLjno0dlNGPzLJ4nSzxcU2g/NvZ/Sss4qa43VbMvpBAoxvcW6cxcn9nur8yFfTGrxvAF2+J5DZNs646VxW7wJhRr4QdtXNt+o9ANpg0e0ipAWE25XFid3FcO2aZr3wlMbTkSsBXKvtT2iPSkm+EHYwEVec1cqEJ6qnYUezvN+u+MCnH5/M6o27i+HrDnQUsm1zq/blpWVzLNbIuox+4icPi6Lo+F2hAxbH88VwFev++nOt+itZjzgzHgMSW9zDhnOq5q9Dnl50zMPnuVY9bUqIT+4x9rfogVOK7jyQogsWpFOw9pLCxGi/b1J0SxXIRixE52WiKAFWz6janMdykGwlEOeZpIQ3WLH3ptWkT9O0GYRO5xabkEVT7rzkKjzcWsUKYjVfCO9jFX0wx0R78drEAamkai2SY6MCyAUasxAwd1VEshtsJ7ibuG7A3MVZ0CyVDwWE72UEoICxUacdCUZ+CfJN5QecBJLEjGxBA1G76jST1APHgLjAFNMHb6aTQMi9ZJQmdnmyubJiE2ILucjRwDVJ/5GwgnUrwA3JjMyKHIwEMRQjSftd19nJY6PPWw6C97J83AgYCSgJ4MAA8C9IEUFPQyqzUAAAAABJRU5ErkJggg==">
                            <span class="team-route-list-item-name">
                                {{item.contactorIdString}}
                                {{item.position !== "" ? "（" + item.position +"）" : ""}}
                            </span>
                            <span>/{{item.mailGroupName}}</span>
                            <button @click.stop="showMore(item)"  class="team-route-list-item-button">详情</button>
                        </div>
                    </div>
                    <div class="team-route-list-item-task">
                        <span>最近任务：{{item.workSheetEntity && item.workSheetEntity.name ? item.workSheetEntity.name : '-' }}</span>
                        <span>任务总数：{{item.workNum}}</span>
                    </div>
                    <div class="team-route-list-item-footer">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAaCAYAAABVX2cEAAADFElEQVQ4jYWV7WtURxTGf3N3dpe4SbZriEYNJjZoDCIi+l2wH0wJttQvgn5rUapCP4jgyx8g/gGCIiKCL6AolEKkQfBL26hFsC++QLLS2Cw2psnGRJONd+7MyFzX5ObuZvPAgZ1nz3nmnHNnzgj6NVWQBb4BdgAbgDQwBTwF+oCfgSAeJlpP2LlFoce4oJPAUaCh2i5lDAHHW3u9m4UeUylW6NargJ+A7SExJWAMUtMCGYCfgqDBQrOFurn488APgHILKaxheJfJYrgLbOKVYEVekC598rexpARTTZbJ9a4Z9vuyw+FQDGud7lk0m+qfQG6smsBCNI5BwzgUOgS02UPAI+CSoNffguFx7i8rGt/U1KiKl+ucICNAu0TZ/fIfK7LF2tkshvYXMFTntZDjC8kUu9cUgsUquwPchHBnd0QOAJvjTivzhtdbkt1S/qfaErrirDnpg8DFCOfO17nyF/wu6pyZBkbFVtFyYsJkZqyI/uknRV9K2e5FKkvqhBhJaLs8So42JYa8uhltPKOJ2qucNxLnIqaKDUzG+cx0ILyk8j2hFVHTafH1YFemNc47G+zKfFXybHucT79XMx7WFBNGEzXvrfoMZe8PdGb3DHRmk44b6MxmBzqzx1D2Rm5aiXhM2g+eyYRR/cKyO1r/5/+/I78s1YonbgOl5x25Ir5d4frFrKLpzQwi1khp+NXztL4ujCZqaV+x7uU4vPPBt3X4dg2+TTJRYuPwRNijWEwgjL4lPRP0Ai+AjuhO9bMBm4dnKUmJTnikg4Cknp8QMdz6u211QQqj3wL7gF+AVNxrmV913kWRB47gW5yY438H9gI3qgnWwL/Al3+2tBfdEJLCzA3MH4FvgSvhnFkak07oj+aOPOrjXZSeWVDGNWAtcHoJKR/YAzxDz19qKWxFT86EQxL21xBzd/Ne+EvNk1KYii9ky+W6Mb6zipDb7OrcaonMomU8ADZGeNeGUws8o2JUZvYJrsHuZvQDzcBv5YwXTr5IePig1IA7Q07wQvkddRkvCrnU4wE8BLZVe3RDXC6PNeADkPVzWEDl/mQAAAAASUVORK5CYII=" alt="定位icon"/>
                        <span>{{item.handleResponseEntity ? item.handleResponseEntity.workPlace : "暂无数据"}}</span>
                        <span>{{item.handleResponseEntity ? item.handleResponseEntity.gmtCreate : "暂无数据"}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 2. 详情页面 -->
        <div class="team-route-detail-container" v-show="displaySwitch==1">
            <!-- 2.1 标题栏 -->
            <div class="team-route-detail-header">
                <span @click="goBack" class="team-route-detail-goback el-icon-arrow-left"></span>
                <div class="team-route-detail-title">轨迹详情</div>
                <div class="team-route-detail-select-container">
                    <img style="position:absolute;top:-1px;left:-1px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII=">
                    <img style="position:absolute;top:-1px;right:-1px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg==">
                    <img style="position:absolute;bottom:-1px;left:-1px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII=">
                    <img style="position:absolute;bottom:-1px;right:-1px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">
                    <select class="team-route-detail-select" v-model="queryDetailList.workId" @change="getTeamDetail">
                        <option value="" selected>全部任务</option>
                        <option
                            v-for="(task, index) in taskList"
                            :key="'detail' + index"
                            :value="task.id"
                        >
                            {{task.name}}
                        </option>
                    </select>
                </div>
            </div>
            <!-- 2.2 人名和任务总数 -->
            <div>
                <span class="team-route-detail-name">
                    {{manInList.contactorIdString}}
                    {{manInList.position !== "" ? "（" + manInList.position +"）" : ""}}
                    /{{manInList.mailGroupName}}
                </span>
                <span class="team-route-detail-count">任务总数：{{ taskTotal }}</span>
            </div>
            <!-- 2.3 工具栏 -->
            <div>
                <div class="team-route-detail-tool">
                    <span class="date-range-selector-border">
                        <img style="position:absolute;top:-1px;left:-1px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII=">
                        <img style="position:absolute;top:-1px;right:-1px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg==">
                        <img style="position:absolute;bottom:-1px;left:-1px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII=">
                        <img style="position:absolute;bottom:-1px;right:-1px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">
                        <el-date-picker
                            class="date-range-selector"
                            v-model="detailDateRange"
                            type="daterange"
                            align="right"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            @change="selectDetailDateRange"
                        >
                        </el-date-picker>
                    </span>
                    <span class="team-route-detail-tool-search">
                        <input
                            class="team-route-detail-tool-search-inner"
                            placeholder="任务名称、地点、姓名、单位"
                            v-model="queryDetailList.search"
                            @change="
                                queryDetailList.page = 1;
                                getTeamDetail();
                            "
                        >
                        <span class="el-icon-search team-route-detail-tool-search-button" @click="getTeamDetail"></span>
                    </span>
                </div>
            </div>
            <!-- 2.4 任务记录 -->
            <ul 
                class="team-route-detail-task-all-container"
                v-infinite-scroll="loadDetail"
                style="list-style-type:none;margin-block-start:0em;margin-block-end:0em;padding-inline-start:0px;"
            >
                <li
                    class="team-route-detail-task-container"
                    v-for="task in teamDetail"
                    :key="'task' + task.id"
                >
                    <div class="team-route-detail-task-single">
                        <div class="team-route-detail-task-name">{{task.name}}</div>
                        <div
                            class="team-route-detail-task-single-status"
                            :class="{'team-route-detail-task-single-status-selected': status.id == selectedStatusId}"
                            v-for="(status, index) in task.handleResponseEntities"
                            :key="'status' + status.id"
                            :ref="'status' + status.id"
                            @click="selectStatus(status.id)"
                        >
                            <!-- 左侧圆圈-->
                            <div
                                class="team-route-detail-task-single-status-point"
                                :class="{'team-route-detail-task-single-status-point-selected': status.id == selectedStatusId}"
                                @click="selectStatus(status.id)"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="width:20px;height:20px;overflow:visible;">
                                    <line :ref="'line'+status.id" x1="10" y1="20" x2="10" :y2="getStatusHeight(status.id, index, task.handleResponseEntities.length)" style="stroke:rgb(73, 149, 225);stroke-width:2"/>
                                </svg>
                            </div>
                            <!-- 边框四个角 -->
                            <img style="position:absolute;top:-1px;left:-2px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII=">
                            <img style="position:absolute;top:-1px;right:-1px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg==">
                            <img style="position:absolute;bottom:-1px;left:-2px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII=">
                            <img style="position:absolute;bottom:-1px;right:-1px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">
                            <div class="team-route-detail-task-single-status-time">{{status.gmtCreate}}</div>
                            <div class="team-route-detail-task-single-status-remark">{{status.remark}}</div>
                            <div class="team-route-detail-task-single-status-document">
                                <span
                                    v-for="(file, fileIndex) in status.documentList"
                                    :key="'statusFile' + fileIndex"
                                >
                                    <a class="team-route-detail-task-single-status-file" v-if="isImg(file.allUrl) == false" :href="file.allUrl">{{file.name}}</a>
                                </span>
                                <span
                                    v-for="(file, fileIndex) in status.documentList"
                                    :key="'statusImg' + fileIndex"
                                >
                                    <img class="team-route-detail-task-single-status-img" v-if="isImg(file.allUrl)" :src="file.allUrl" :alt="file.name" @click.stop="$window.displayPicture($event)"/>
                                </span>
                            </div>
                            <div class="team-route-detail-task-single-status-footer">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAaCAYAAABVX2cEAAADFElEQVQ4jYWV7WtURxTGf3N3dpe4SbZriEYNJjZoDCIi+l2wH0wJttQvgn5rUapCP4jgyx8g/gGCIiKCL6AolEKkQfBL26hFsC++QLLS2Cw2psnGRJONd+7MyFzX5ObuZvPAgZ1nz3nmnHNnzgj6NVWQBb4BdgAbgDQwBTwF+oCfgSAeJlpP2LlFoce4oJPAUaCh2i5lDAHHW3u9m4UeUylW6NargJ+A7SExJWAMUtMCGYCfgqDBQrOFurn488APgHILKaxheJfJYrgLbOKVYEVekC598rexpARTTZbJ9a4Z9vuyw+FQDGud7lk0m+qfQG6smsBCNI5BwzgUOgS02UPAI+CSoNffguFx7i8rGt/U1KiKl+ucICNAu0TZ/fIfK7LF2tkshvYXMFTntZDjC8kUu9cUgsUquwPchHBnd0QOAJvjTivzhtdbkt1S/qfaErrirDnpg8DFCOfO17nyF/wu6pyZBkbFVtFyYsJkZqyI/uknRV9K2e5FKkvqhBhJaLs8So42JYa8uhltPKOJ2qucNxLnIqaKDUzG+cx0ILyk8j2hFVHTafH1YFemNc47G+zKfFXybHucT79XMx7WFBNGEzXvrfoMZe8PdGb3DHRmk44b6MxmBzqzx1D2Rm5aiXhM2g+eyYRR/cKyO1r/5/+/I78s1YonbgOl5x25Ir5d4frFrKLpzQwi1khp+NXztL4ujCZqaV+x7uU4vPPBt3X4dg2+TTJRYuPwRNijWEwgjL4lPRP0Ai+AjuhO9bMBm4dnKUmJTnikg4Cknp8QMdz6u211QQqj3wL7gF+AVNxrmV913kWRB47gW5yY438H9gI3qgnWwL/Al3+2tBfdEJLCzA3MH4FvgSvhnFkak07oj+aOPOrjXZSeWVDGNWAtcHoJKR/YAzxDz19qKWxFT86EQxL21xBzd/Ne+EvNk1KYii9ky+W6Mb6zipDb7OrcaonMomU8ADZGeNeGUws8o2JUZvYJrsHuZvQDzcBv5YwXTr5IePig1IA7Q07wQvkddRkvCrnU4wE8BLZVe3RDXC6PNeADkPVzWEDl/mQAAAAASUVORK5CYII=" alt="定位icon"/>
                                <span>{{status.workPlace}}</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    name: 'teamRoute',
    props: [],
    components: {},
    created() {
        this.$window = window;
    },
    mounted() {
        this.getTeamList();
    },
    watch: {
        teamDetail(val) {
            let self = this;
            if(self.displaySwitch == 0 && self.selectedId !== "-1") {
                self.drawMapNew();
            }
            if(self.displaySwitch == 1 && self.queryDetailList.workId == '') {
                self.drawMapAll();
            }
            if(self.displaySwitch == 1 && self.queryDetailList.workId !== '') {
                self.drawMapSingle();
            }
        }
    },
    methods: {
        /**
         * @method
         * @description 队伍列表下拉刷新
         */
        load() {
            let self = this;
            self.queryList.page++;
            // console.log("load()正在发送请求：【\n", self.queryList, "\n】");
            let request = {
                url: "/work/workSheetContactor/listContactor",
                method: "post",
                data: self.queryList,
                params: {},
                header: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            };
            this.apix(request)
            .then(
                (res) => {
                    // console.log("load()请求列表成功：【\n", res.page.list, "\n】");
                    if(res.page.list.length > 0) {
                        self.teamList.push(...res.page.list);
                    } else {
                        self.queryList.page--;
                        // console.log("load()到底了！");
                    }
                }
            )
            .catch(
                err => {
                    console.log("load()请求列表失败：【\n", err, "\n】");
                }
            )
        },
        /**
         * @method
         * @desc 初始化传递Amap实例
         */
        initMap(map) {
            this.map = map;
        },

        /**
         * @method
         * @desc 获取队伍数据
         * @return {null}
         */
        getTeamList() {
            let self = this;
            // 重置查询的页数
            self.queryList.page = 1;
            // console.log("getTeamList()正在发送请求：【\n", self.queryList, "\n】");
            let request = {
                url: "/work/workSheetContactor/listContactor",
                method: "post",
                data: self.queryList,
                params: {},
                header: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            };
            this.apix(request)
            .then(
                res => {
                    // console.log("getTeamList()请求列表成功：【\n", res.page.list, "\n】");
                    self.teamList = res.page.list;
                }
            )
            .catch(
                err => {
                    console.log("getTeamList()请求列表失败：【\n", err, "\n】");
                }
            )
        },

        /**
         * @method
         * @desc 点击选中列表中的某个人
         * @param {num} id 选中的人的id
         * @param {object} event 点击事件
         */
        selectMan(id, event) {
            let self = this;
            id == this.selectedId ? this.selectedId = "-1" : this.selectedId = String(id);
            // console.log("选中id：", this.selectedId, event);
            if(this.selectedId !== "-1") {
                self.queryDetailList.contactorId = self.selectedId;
                self.getTeamDetail();
            } else {
                self.queryDetailList.contactorId = '';
                self.teamDetail = [];
                // self.map.clearMap();
                self.map.remove(self.amapInstances)
                self.amapInstances = []
            }
            
        },

        /**
         * @method
         * @desc 详情的时候点击
         * @param {string} id 当前状态记录的id
         */
        selectStatus(id) {
            let self = this;
            self.markers[id].emit('click', {target: self.markers[id]});
            // this.selectedStatusId == id ? this.selectedStatusId = '-1' : this.selectedStatusId = id;
            this.selectedStatusId = id;
            // console.log("selectedStatusId =", this.selectedStatusId);
        },

        /**
         * @method
         * @desc 获取某个id的人的详情
         * @return {null}
         */
        getTeamDetail() {
            let self = this;
            self.queryDetailList.page = 1;
            // console.log("getTeamDetail()查询条件：【\n", self.queryDetailList, "\n】");
            let request = {
                url: "/work/workSheet//listByContactorId",
                method: "post",
                data: self.queryDetailList,
                params: {},
                header: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            };
            this.apix(request)
            .then(
                res => {
                    self.taskTotal = res.page.totalCount;
                    // console.log("getTeamDetail()获取队伍详情成功：【\n", res.page.list, "\n】");
                    self.teamDetail = res.page.list;
                    // 保存这个人所有的任务名和id
                    if(self.taskList.length == 0) {
                        for(let task of self.teamDetail) {
                            self.taskList.push({
                                id: String(task.id),
                                name: task.name
                            });
                        }
                    }
                }
            )
            .catch(
                err => {
                    console.log("getTeamDetail()获取队伍详情失败：【\n", err, "\n】");
                }
            );
        },

        /**
         * @method
         * @desc 下拉刷新详情
         * @return {null}
         */
        loadDetail() {
            let self = this;
            self.queryDetailList.page++;
            // console.log("loadDetail()查询条件：【\n", self.queryDetailList, "\n】");
            let request = {
                url: "/work/workSheet//listByContactorId",
                method: "post",
                data: self.queryDetailList,
                params: {},
                header: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            };
            this.apix(request)
            .then(
                res => {
                    // console.log("loadDetail()获取队伍详情成功：【\n", res.page.list, "\n】");
                    if(res.page.list !==null && res.page.list !== undefined && res.page.list !== '' && res.page.list.length > 0) {
                        self.teamDetail.push(...res.page.list);
                        // 保存这个人所有的任务名和id
                        self.taskList.push(...res.page.list.map((ele) => ({
                            id: ele.id,
                            name: ele.name
                        })));
                    } else {
                        self.queryDetailList.page--;
                        // console.log("loadDetail()到底了！");
                    }
                }
            )
            .catch(
                err => {
                    console.log("loadDetail()获取队伍详情失败：【\n", err, "\n】");
                }
            );
        },

        /**
         * @method
         * @desc 地图上显示一个人参与所有任务的最新一条记录的落点
         * @return {null}
         */
        drawMapNew() {
            let self = this;
            // 清除所有定点和路径
            // this.map.clearMap();
            self.map.remove(self.amapInstances)
            self.amapInstances = []
            this.markers = [];
            // 记录最新的记录
            let latest = 0;
            // 定点集合
            let markerSet = [];
            // 绘制每个任务最新记录的定点
            let groupStatus = this.teamDetail;
            for(let task in groupStatus) {
                // 判断该任务有没有状态记录
                if(groupStatus[task].handleResponseEntities.length > 0) {
                    // 判断记录这个人所有任务中最新的记录
                    groupStatus[task].handleResponseEntities[0].id > latest ? latest = groupStatus[task].handleResponseEntities[0].id : null ;
                    // 创建一个 Icon
                    var manDefaultIcon = new AMap.Icon({
                        // 图标尺寸
                        size: new AMap.Size(38, 52),
                        // 图标的取图地址
                        image: 'data:image/png;base64,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',
                        // 图标所用图片大小
                        imageSize: new AMap.Size(38, 52),
                        // 图标取图偏移量
                        imageOffset: new AMap.Pixel(0, 0)
                    });
                    // 创建一个 Icon
                    var manSelectedIcon = new AMap.Icon({
                        // 图标尺寸
                        size: new AMap.Size(38, 52),
                        // 图标的取图地址
                        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAA0CAYAAADmI0o+AAAOAUlEQVRYhaWZCZBdxXWG/9Pd9963zb5IIyGJVcQSIDCSFYNNQFQlBhKn7KByQogTBSoGVzmyCBCTFKlsJAaq4kqITXBsoEJhsGUnZjFLwCQGGVGIEA1oGcYjJLTMaPaZN2+793b3SfWdmcebmTcj2elXXXfr2+d7p/ucPqcvLb8kxP+j0Cle5V+0a3Wa7U4F8PO+d0rgpcAW6/QXhayFoUXuV8tiYPOFL3V9OlrhJWCoHlw9sMWEzp4nx9+6x7S3ruGPk8Q6EugCELBFiRlHTYS9x94Ue176hijXQM0Kr4Xkmr7nwNWb/LTYsX0ZxG/er68THr5IAlcBkPPpa6QV2OKpyiT902O3yP+tecRzmy041gWrB5Wc3/gNsz7VxA+BsLkezGKFAWaL7w50i+3P3S/G54EsCrcUWLV+/tvxVunjIQJysw0jQzhekBisCBRjILSElGQ0+YzlaYsVWQtBNUpgvF8ap889uV11zwOrBzgHrJ62xI3/Gm+XHu6fbXSsIPHTIQ8fTImlVSUYF7YYXNZp0OzbWZnFME+/8eQfq10zrexiWlsMLKmfe1B/Rvn8XXc+Ggr850mF/kItEM/8X56uRDO1pjsCLmg1uLLDIJDWtZ+YGqTLnv5z1beU1uZbZRXumrt1Fwk8ZDTRwSnCi0Nq+v8JOw1hDMAGF6SBNYGAL4DIAh+EFvucLZIEpExA940L7CsQbugy6Axsc7oVD3euwpahY9A1MFRvKOdrS3zmn+MHpcBN70wRXh2V07cTII0MNG7s8PHx1hSyaqEZFDXj9bEKHh+OUXKGK9W0JgVw/TKD5YFFHOIPn9rhPT4DY+drrRZsVoLYcqdZ3nCGPfRBCP+F0Zmhc1A6xuYU45bVTVWgpbxrSTMeOprH7goB6kO43+1gZAXvf3q7d2kN1Jz5Nn8GJ3L8dru1EMF/YcICUgMiBriCK7MWO85qTqDoFC7DPXPttp/VhKuyJnk/6Yc0Xp60MIbWb7krvqiea6o3x5IGxvLVb1XsnPl0vtC4edUyCJoLpOMYz33nQfzsnbeS6/Mu2ohrb7gVyvOSa0nATaua0X9oCO9ZCyiJQUPoK0uckaGrAbxTz/PX1VhR88XvmRiQJvmH0CXcvLIFvqC5C55lfOvv/gTdr7+CUiGfVHf+rXtuS57NlkAQfr+rCTDl6f6kQbfWsEwX1HFTVbAFC/QRYzohZqBsiI+lBNZkggWq7d79Ywz3H11wf3jgWPKstpybS2FzSgDshtNggmIMGnN2PSh3Xaux6sOTiGWiLWEgOMLmpmzdt48e6lkANVuO9R2cKwnAxxqzEDYEhNOaxQDFHYtNVVHz3uyRxlUEkgZEEaQNcXYmXVd454rVi4J1nnHmgnvnZFKQtgJBMUhq5EXs18qtNYC664pREaSMoSiGQoiWmYk8v2y68jpkG5oW3Hf3Nv7KtQvut3g+JCIomu6/LLU+lcbmFFYaUhoIoSFgEgdTr0glcdv9j2LdpZdVn67feDl23PdI8mx+sWBIuH5N0n8ko6lFuq4fwXpkJkmgxc0z6VSuQ+RkZkG77/zjX6Jj5Rpc/4U7Eyt0P0ECzz35TUwOD+K3v3T3nPaTOkz6c9PEOj+izELLWQKMpNIHSOByYg3pWfSHRawI5oI98cBf49CBvUndv+c1fOTSy5PAa/+bryVuw5XvP3Qvrv/Cn1bfGQhLSX/C07BuIYhp1noWDGe9oWTBZrcQ8bQB+Iy95aE5Dd4/+A769r1dvZ6aGMObP34Ge175URXKlYNv78bhnner164f4TOE1NMGULE/nZV5OmBQk+LfpbSQykL4QHc0hNG4Un3+6jNP1HutbvnJ048nt09GJXRHwyAfkB5DCjPiP9G1a7H36oJ5f3H+XiH0XuFZIMVgz2Dn+IGqEaw4ay2CdAZ+Kr1kdW1Wnn1+8t4PxntgPQORYkBZkLbfE/sbwsXSNxdd1PqP2ZVA8Nf2Xkct0U5oEBUjoBDhmvQ5uKbpvNPW1mx5dqIXL1WOgHMekPXBkob57eYr6IFzjznvVCfCWBBdfBio7bj4eaH569I3EFlA5ggvVnrx9OSBRd3H/OLaPTPZg1fCPlCOIHMA+YbFmPgyPXDuiTq5Z7XIXNfdVGchTe5xT8NP5BWDl5LP57h4T5DF4XAE7xb70SqzaFfZut7RSeipDOHR8T141w6AchLUIICAgJL8W/ulTY/OCw7rJiMLoteaoxC/djynPn/oMQj+1SR2LsUuAgRiiyZksD7owjLVCJ8kYjY4qfPYHw4gjzLYE0BGgbIK7EmgpO6Jbrr8vhmo2rogiq0HtgBQfupoztvW+yMI3oiInZmDI5ME+WwYqAlxXMBGznn6AhRIF/OAfQEO1cPhjVfuOAVQFWy+g62XsrN5YXXRv3DyZmzufxlptLshIS1ALrA1FklKwTMZkmKQFIAnwS78FuzavRzdsfH2xSDmnVeHcsHcmq256080y9XlT0HhMhCfaRvLitcfvwLE01GBi24tJYfZ9M2xJWHrrJyKNym7V++BUe9zJF7XP8u8UHp2+UQdwEWTkeoxd8vhdtGsf4/IXs3WFqG5wIYLcJsmK8e7sG70BiJnDqfYKIhpCm+d8TiKviEpclCUIxJZWHrFnPQfK/zbmpHFtgrmg6HxKz2/DsIXmbkIbcZg7BiMnkLMJRubCmsOxebRT9CayrYlodyfeKvlXj6eGyElUvBkhqRsIEUtkLINQmRgxIP5+857dh5Ucu7cRXKW+XS/TH/2xB0g/A4bM8hxdIK17udKedCG0TCH5REuVcZhdEUW25pEg1lOTcU2EhYLKlnGwbandDe9zGF5EoaLYFuCjctWoAyLKBl2iauDT450QdMb5nhmjtaqYOnPnrgLhC1szXGY+DjicIDDyklbLI7aUmHU5KfysrPlHK+z/Y+Ibc6ekPtk51RWZOMOogSmWvlQ4y683xnK1sYtIHtUDw0dZhOV2JqQiEMit4InawqTFBvUmaWV4a72OetmAtb4Zz3XgrCNjTkOHZ9wQKZcGrKFwojJT4zr8dGpYM3qj8jm1m1cLvbp/ESPHhvtiw6Ud3nrzToKbBsROzkw/fbZyvPyB2xtgYSEaGi4ihQOh8ePHAabEOAIBCMEWRLCGYwkITYFl48Mhrvae6tgKx7Y6uLm+5ht0Q0d4vCkLZeHbbEwbMaGJuKRgXw8eLyUuWTzHRRHY2Yq/1483P9+5XDPsfDggf7w0MBLmcs6nfAmmw9fHbnzf/7KFAtT5KmY/ADCUxnKZi8pvfHaD9mYmFyqq5SDEiQcuVAQIiBBm4JPjnw/fK09WfGcH9sIoA2WD5HReavjSRuWJmxxIh+PD+Tjo8dcvEMkRCuzGeK4UjSFiSk91F8Ij7xX1Hv6x6iteHPLtk13n9j2ve2mHyY4SxvV0jqlWtqKzKZIIlhli2PaFsdi8JkWXiDIkz75XloY1Qip8pA4Z4Zl9yzYWpdQE9vQgstsTYWNDk1pKjITI3E42Beb8WHTZm7tI6myFARZ1dTc6J+xqizSvjD5lVH5xcJo+cX/+rL0Vyp/XWtGtS3LuTaurXsHRveVenaXZUuHFI1pKZsbQ9a5SiILXBbscjq3F5GwVMHkHF9iLMNaW5tK27DMld53vp76pY9+VWYbz3LOlIJ0yutYMWXDcsgmyXZcTK5EkA5ErrFBNjR3JW2V31npefsrro9qepIkCMyJrA8tkWf3dGfBXEzkMQmfQD4pFZDyApHOeZTOKdXcLjiO5OA3/6av86a7bk+tu/Q2pdouEulsh21qnYTRJbbWJGBuzkiVEUG6SQSpLpYyLu9/8/ahb//9EdW2XLq+XJ9J38oLSKlE5rRseDMsVbA3AYQQlIOQjaS8HAWpnMjkKl5Hl4Y1LHONkW7p0GM/fOQY/uPhHR1/cMfFXkfXJ1TQsgYkcuBpMDgzZFtgoz+Ihk48P/zwvW87f5U690JPNbcp2dzuex1dGZHJJTJIeQ1OZiLbMUyzoOrx1+7svgXAVjbmCKLKMRtWBmxYHjRTExM2Pz5lCvmyzo/HXC5oMzWpbaVk9cRIYj3k+ZQ694IkVa/07StzHE1HB83tQqQyQjY0qUTzjS2ezDWmRWOLG+ZmEaSXOa3CT60iKV3avrN364Z/qdWYK48A+CgJsRKeHwu3oFCyInvCTwWUayyp5rayKRdjDiuxDcvahhXmOLJkDbOOE8j02etSLCSR5wsRpEgEaUVBypPprIdUOi1T2Qyl0o0iSLcJP+gkz18OIZYDODTDgDkam9Gay/X/AczLYHQ/G+2WpVGOowkbRwWOwjLruGyjSgxjNLTWbI2d1VC1Q88nElJAKQUplfBTbj6lyQ/SwvNz5PnN5PltJNUySLUCRIMAbuvdumGyLtgMXAqAC+auZGOGyJoR1vEEG51nrYtsTYl1HIE5Yh0bWKsT66qN44QQiTdXngQ5Y/J8EjJDSjnX4eZwMwvZTlJ2AvhvAF/r3bqhgnmlbtyydmf3JgC3Mtt2WB4naybZ2im2ugxjK2AbMnOMxBrZJik4pt1wsrUl3HiSBxIBpEiRUGkSooGFbIKgFiLhwp0He7du2FNP/gKNzYNzz34ZwKcBXMBsy7BcIuu2BVFha2MXcSVgcyJft48ORUI483dzLg1BGSLhDGQfgKcBvNG7dcOS3yxP65PQ2p3dDW7fzRnIjHdextMO2MEZ2GQ4XbyfxK/Jvgy53Vq4+eMWZref4FzBVO/WDacj8uf/KLp2Z/IpyCUqbjew3YVyLuh1n5fc9q376gbAbWC44VqQgp4WGID/A3oz2H8u4323AAAAAElFTkSuQmCC',
                        // 图标所用图片大小
                        imageSize: new AMap.Size(38, 52),
                        // 图标取图偏移量
                        imageOffset: new AMap.Pixel(0, 0)
                    });
                    // 绘制记录落点
                    if(groupStatus[task].handleResponseEntities[0].longitude !== null && groupStatus[task].handleResponseEntities[0].longitude !== undefined && groupStatus[task].handleResponseEntities[0].longitude > 0) {
                        console.log("绘制定点：[", groupStatus[task].handleResponseEntities[0].longitude, groupStatus[task].handleResponseEntities[0].latitude, "]");
                        let marker = new AMap.Marker({
                            icon: manDefaultIcon,
                            position: [groupStatus[task].handleResponseEntities[0].longitude, groupStatus[task].handleResponseEntities[0].latitude],
                            map: self.map,
                            offset: new AMap.Pixel(-20,-20)
                        });
                        self.amapInstances.push(marker)
                        // 记录当前绘制的marker到全局，用于调用外部记录的click事件
                        self.markers[groupStatus[task].handleResponseEntities[0].id] = marker;
                        // 添加点击事件，打开信息窗体
                        AMap.event.addListener(marker, 'click', openInfo);
                        function openInfo() {
                            // 构建信息窗体中显示的内容
                            let info = [];
                            info.push("<div class='map-card-container'>");
                                info.push('<img style="position:absolute;top:0px;left:0px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII="><img style="position:absolute;top:0px;right:0px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg=="><img style="position:absolute;bottom:7px;left:0px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII="><img style="position:absolute;bottom:7px;right:0px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">');
                                info.push("<div class='map-card-task-name'>" + groupStatus[task].name + "</div>");
                                info.push("<span class='map-card-man-name'>" + groupStatus[task].handleResponseEntities[0].contactorEntity.contactorIdString + "</span>");
                                info.push("<span class='map-card-time'>" + groupStatus[task].handleResponseEntities[0].gmtCreate + "</span>");
                                info.push("<div class='map-card-remark'>" + groupStatus[task].handleResponseEntities[0].remark + "</div>");
                                for(let file of groupStatus[task].handleResponseEntities[0].documentList) {
                                    if(self.isImg(file.allUrl) == false) {
                                        info.push("<div class='map-card-file'><a href='" + file.allUrl + "'>" + file.name + "</a></div>");
                                    }
                                }
                                for(let file of groupStatus[task].handleResponseEntities[0].documentList) {
                                    if(self.isImg(file.allUrl)) {
                                        info.push(`<img class="map-card-img" src="${file.allUrl}" alt="${file.name}" onclick="displayPicture(event)">`);
                                    }
                                }
                            info.push("</div>");
                            // 构建信息窗口实例
                            let infoWindow = new AMap.InfoWindow({
                                isCustom: true,
                                content: info.join(""),  //使用默认信息窗体框样式，显示信息内容
                                offset: new AMap.Pixel(0, -30)  // 偏移量
                            });
                            self.amapInstances.push(infoWindow)
                            infoWindow.open(self.map, marker.getPosition());
                            // 点击修改图标
                            for(let i in markerSet) {
                                markerSet[i].setIcon(manDefaultIcon);
                            }
                            marker.setIcon(manSelectedIcon);
                            // 移动到中心
                            self.map.panTo(marker.getPosition());
                        }
                        // 最新的记录默认打开信息窗口
                        latest == groupStatus[task].handleResponseEntities[0].id ? marker.emit('click', {target: marker}) : null ;
                        // 记录落点到数组中，用于后续清空
                        markerSet.push(marker);
                    }
                }
            }
        },

        /**
         * @method
         * @desc 判断链接文件是图片还是文档
         * @param {string} url 文件的url
         * @return {boolen} 是图片则返回true
         */
        isImg(url) {
            let res = url.slice(-4);
            if(res == '.png' || res == '.jpg' || res == 'jpeg' || res == '.gif' || res == '.bmp') {
                return true;
            }
            return false;
        },

        /**
         * @method
         * @desc 点击后退到主页面
         * @return {null}
         */
        goBack() {
            let self = this
            this.displaySwitch = 0;
            // this.map.clearMap();
            self.map.remove(self.amapInstances)
            self.amapInstances = []
            this.queryDetailList = {
                module: "",
                contactorId: "",
                page: 1,
                limit: 10,
                search: "",
                startTime: "",
                endTime: "",
                workId: ""
            };
        },

        /**
         * @method
         * @desc 点击显示详情
         * @param {object} man 需要获取详情的人的相关信息
         */
        showMore(man) {
            let self = this
            console.log("点击展开id=", man.id, "的详情...");
            this.manInList = man;
            // 重置数据
            this.displaySwitch = 1;
            this.selectedId = "-1";
            this.teamDetail = [];
            this.taskList = [];
            // this.map.clearMap();
            self.map.remove(self.amapInstances)
            self.amapInstances = []
            this.queryDetailList = {
                module: "",
                contactorId: "",
                page: 1,
                limit: 10,
                search: "",
                startTime: "",
                endTime: "",
                workId: ""
            };
            this.selectedStatusId = '-1';
            // 获取详情数据
            this.queryDetailList.contactorId = String(man.id);
            this.getTeamDetail();
        },

        /**
         * @method
         * @desc 画出所有记录的落点
         * @return {null}
         */
        drawMapAll() {
            let self = this;
            // 清除所有定点和路径
            // this.map.clearMap();
            self.map.remove(self.amapInstances)
            self.amapInstances = []
            this.markers = [];
            // 记录最新的记录
            let latest = 0;
            // 定点集合
            let markerSet = [];
            // 绘制每个任务最新记录的定点
            // 遍历所有任务
            for(let task of self.teamDetail) {
                // 遍历任务中的所有记录
                for(let status of task.handleResponseEntities) {
                    // 判断记录这个人所有任务中最新的记录
                    status.id > latest ? latest = status.id : null ;
                    // 创建一个 Icon
                    var manDefaultIcon = new AMap.Icon({
                        // 图标尺寸
                        size: new AMap.Size(38, 52),
                        // 图标的取图地址
                        image: 'data:image/png;base64,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',
                        // 图标所用图片大小
                        imageSize: new AMap.Size(38, 52),
                        // 图标取图偏移量
                        imageOffset: new AMap.Pixel(0, 0)
                    });
                    // 创建一个 Icon
                    var manSelectedIcon = new AMap.Icon({
                        // 图标尺寸
                        size: new AMap.Size(38, 52),
                        // 图标的取图地址
                        image: 'data:image/png;base64,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',
                        // 图标所用图片大小
                        imageSize: new AMap.Size(38, 52),
                        // 图标取图偏移量
                        imageOffset: new AMap.Pixel(0, 0)
                    });
                    // 绘制落点
                    if(status.longitude !== null && status.longitude !== undefined && status.longitude > 0) {
                        console.log("绘制定点：[", status.longitude, status.latitude, "]");
                        let marker = new AMap.Marker({
                            icon: manDefaultIcon,
                            position: [status.longitude, status.latitude],
                            map: self.map,
                            offset: new AMap.Pixel(-20,-20)
                        });
                        self.amapInstances.push(marker)
                        // 记录当前绘制的marker到全局，用于调用外部记录的click事件
                        self.markers[status.id] = marker;
                        // 添加点击事件，打开信息窗体
                        AMap.event.addListener(marker, 'click', openInfo);
                        function openInfo() {
                            // 构建信息窗体中显示的内容
                            let info = [];
                            info.push("<div class='map-card-container'>");
                                info.push('<img style="position:absolute;top:0px;left:0px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII="><img style="position:absolute;top:0px;right:0px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg=="><img style="position:absolute;bottom:7px;left:0px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII="><img style="position:absolute;bottom:7px;right:0px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">');
                                info.push("<div class='map-card-task-name'>" + task.name + "</div>");
                                info.push("<span class='map-card-man-name'>" + status.contactorEntity.contactorIdString + "</span>");
                                info.push("<span class='map-card-time'>" + status.gmtCreate + "</span>");
                                info.push("<div class='map-card-remark'>" + status.remark + "</div>");
                                for(let file of status.documentList) {
                                    if(self.isImg(file.allUrl) == false) {
                                        info.push("<div class='map-card-file'><a href='" + file.allUrl + "'>" + file.name + "</a></div>");
                                    }
                                }
                                for(let file of status.documentList) {
                                    if(self.isImg(file.allUrl)) {
                                        info.push(`<img class="map-card-img" src="${file.allUrl}" alt="${file.name}" onclick="displayPicture(event)">`);
                                    }
                                }
                            info.push("</div>");
                            // 构建信息窗口实例
                            let infoWindow = new AMap.InfoWindow({
                                isCustom: true,
                                content: info.join(""),  //使用默认信息窗体框样式，显示信息内容
                                offset: new AMap.Pixel(0, -30)  // 偏移量
                            });
                            self.amapInstances.push(infoWindow)
                            infoWindow.open(self.map, marker.getPosition());
                            // 点击修改图标
                            for(let i in markerSet) {
                                markerSet[i].setIcon(manDefaultIcon);
                            }
                            marker.setIcon(manSelectedIcon);
                            // 记录当前选中状态记录
                            self.selectedStatusId = status.id;
                            // 移动到中心
                            self.map.panTo(marker.getPosition());
                        }
                        // 最新的记录默认打开信息窗口
                        latest == status.id ? marker.emit('click', {target: marker}) : null ;
                        // 记录落点到数组中，用于后续清空
                        markerSet.push(marker);
                    }
                    
                }
            }
        },

        /**
         * @method
         */
        drawMapSingle() {
            let self = this;
            // 清除所有定点和路径
            // this.map.clearMap();
            self.map.remove(self.amapInstances)
            self.amapInstances = []
            this.markers = [];
            // 路径点集合
            let polylinePath = [];
            // 定点集合
            let markerSet = [];
            // 遍历所有记录
            let task = self.teamDetail[0].handleResponseEntities;
            // 如果任务有状态记录
            if(task.length > 0) {
                for (let status = task.length - 1; status >= 0; status-- ) {
                    // 创建一个 Icon
                    var manDefaultIcon = new AMap.Icon({
                        // 图标尺寸
                        size: new AMap.Size(38, 52),
                        // 图标的取图地址
                        image: 'data:image/png;base64,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',
                        // 图标所用图片大小
                        imageSize: new AMap.Size(38, 52),
                        // 图标取图偏移量
                        imageOffset: new AMap.Pixel(0, 0)
                    });
                    // 创建一个 Icon
                    var manSelectedIcon = new AMap.Icon({
                        // 图标尺寸
                        size: new AMap.Size(38, 52),
                        // 图标的取图地址
                        image: 'data:image/png;base64,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',
                        // 图标所用图片大小
                        imageSize: new AMap.Size(38, 52),
                        // 图标取图偏移量
                        imageOffset: new AMap.Pixel(0, 0)
                    });
                    // 绘制落点
                    if(task[status].longitude !== null && task[status].longitude !== undefined && task[status].longitude > 0) {
                        console.log("绘制定点：[", task[status].longitude, task[status].latitude, "]");
                        let marker = new AMap.Marker({
                            icon: manDefaultIcon,
                            position: [task[status].longitude, task[status].latitude],
                            map: self.map,
                            offset: new AMap.Pixel(-20,-20)
                        });
                        self.amapInstances.push(marker)
                        // 记录当前绘制的marker到全局，用于调用外部记录的click事件
                        self.markers[task[status].id] = marker;
                        // 添加点击事件，打开信息窗体
                        AMap.event.addListener(marker, 'click', openInfo);
                        function openInfo() {
                            let info = [];
                            info.push("<div class='map-card-container'>");
                                info.push('<img style="position:absolute;top:0px;left:0px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII="><img style="position:absolute;top:0px;right:0px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg=="><img style="position:absolute;bottom:7px;left:0px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII="><img style="position:absolute;bottom:7px;right:0px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">');
                                info.push("<div class='map-card-task-name'>" + self.teamDetail[0].name + "</div>");
                                info.push("<span class='map-card-man-name'>" + task[status].contactorEntity.contactorIdString + "</span>");
                                info.push("<span class='map-card-time'>" + task[status].gmtCreate + "</span>");
                                info.push("<div class='map-card-remark'>" + task[status].remark + "</div>");
                                for(let file of task[status].documentList) {
                                    if(self.isImg(file.allUrl) == false) {
                                        info.push("<div class='map-card-file'><a href='" + file.allUrl + "'>" + file.name + "</a></div>");
                                    }
                                }
                                for(let file of task[status].documentList) {
                                    if(self.isImg(file.allUrl)) {
                                        info.push(`<img class="map-card-img" src="${file.allUrl}" alt="${file.name}" onclick="displayPicture(event)">`);
                                    }
                                }
                            info.push("</div>");
                            // 构建信息窗口实例
                            let infoWindow = new AMap.InfoWindow({
                                isCustom: true,
                                content: info.join(""),  //使用默认信息窗体框样式，显示信息内容
                                offset: new AMap.Pixel(0, -30)  // 偏移量
                            });
                            self.amapInstances.push(infoWindow)
                            infoWindow.open(self.map, marker.getPosition());
                            // 点击修改图标
                            for(let i in markerSet) {
                                markerSet[i].setIcon(manDefaultIcon);
                            }
                            marker.setIcon(manSelectedIcon);
                            // 记录当前选中状态记录
                            self.selectedStatusId = task[status].id;
                            // 移动到中心
                            self.map.panTo(marker.getPosition());
                        }
                        // 发送点击事件，让信息窗口默认打开，因为是倒序执行，所以是最新的信息
                        marker.emit('click', {target: marker});
                        // 记录落点为路径点
                        polylinePath.push(new AMap.LngLat(task[status].longitude, task[status].latitude));
                        // 记录落点到数组中，用于后续清空
                        markerSet.push(marker);
                    }
                }
                // 绘制路径
                let polyline = new AMap.Polyline({
                    path: polylinePath,
                    map: self.map,
                    strokeColor: "#2CAAEC",

                });
                self.amapInstances.push(polyline)
                // 绘制任务本身的落点
                var taskIcon = new AMap.Icon({
                    // 图标尺寸
                    size: new AMap.Size(38, 52),
                    // 图标的取图地址
                    image: 'data:image/png;base64,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',
                    // 图标所用图片大小
                    imageSize: new AMap.Size(38, 52),
                    // 图标取图偏移量
                    imageOffset: new AMap.Pixel(0, 0)
                });
                if(self.teamDetail[0].longitude) {
                    let taskMarker = new AMap.Marker({
                        icon: taskIcon,
                        position: [self.teamDetail[0].longitude, self.teamDetail[0].latitude],
                        map: self.map,
                        offset: new AMap.Pixel(-20,-20)
                    });
                    self.amapInstances.push(taskMarker)
                    // 添加文本标注
                    taskMarker.setLabel({
                        offset: new AMap.Pixel(0, 10),  //设置文本标注偏移量
                        content: `<div class="map-task-container">
                                    <img style="position:absolute;top:-1px;left:-1px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII="><img style="position:absolute;top:-1px;right:-1px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg=="><img style="position:absolute;bottom:-1px;left:-1px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII="><img style="position:absolute;bottom:-1px;right:-1px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">
                                    <div class="map-task-title">
                                        ${self.teamDetail[0] ? self.teamDetail[0].name : '-'}
                                    </div>
                                    <div class="map-task-location">
                                        ${self.teamDetail[0] ? self.teamDetail[0].workPlace : '-'}
                                    </div>
                                </div>`, //设置文本标注内容
                        direction: 'bottom' //设置文本标注方位
                    });
                    self.map.panTo(taskMarker.getPosition());
                } 
            }
        },

        /**
         * @method
         * @desc 日期选择的时候赋值到queryList
         */
        selectDateRange(dateRange) {
            this.queryList.startTime = dateRange ? dateRange[0] : ''
            this.queryList.endTime = dateRange ? dateRange[1] : ''
            this.getTeamList()
        },

        /**
         * @method
         * @desc 日期选择的时候赋值到queryList
         */
        selectDetailDateRange(dateRange) {
            this.queryDetailList.startTime = dateRange ? dateRange[0] : ''
            this.queryDetailList.endTime = dateRange ? dateRange[1] : ''
            this.getTeamDetail()
        },

        /**
         * @method
         * @desc 点击按钮拨打电话
         * @param {object} man 需要拨打的人的对象
         */
        calling(man) {
            console.log("正在拨打【", man, "】的电话...");
            // this.callPhone(man);
        },

        /**
         * @method
         * @desc 点击按钮邀请会议
         * @param {object} man 需要邀请的人的对象
         */
        meeting(man) {
            console.log("正在邀请【", man, "】参加会议...");
            let ws = new WebSocket(window.SITE_CONFIG["websocket"]);
            var msgArray = [];
            var msg = {
                contactName: man.name,
                phone: man.mobile1,
                memberType: 1
            };
            msgArray.push(msg);
            var sendMsg = {
                member: msgArray,
                platformId: man.platformId,
                type: "CreateConf"
            };
            ws.onopen = function() {
                ws.send(JSON.stringify(sendMsg));
                console.log("WebSocket发送的内容：", sendMsg);
                console.log("WebSocket地址：", ws);
            };
            ws.onmessage = function(evt) {
                console.log("WebSocket接收到的数据：", evt);
            };
            ws.onerror = function(evt) {
                console.log("WebSocket错误信息：", evt);
            };
        },

        /**
         * @method
         * @desc 获取一条状态记录的dom高度，并对对应line设置长度
         * @param {string} id 状态记录的id
         */
        getStatusHeight(id, index, length) {
            let statusIndex = 'status' + id;
            let lineIndex = 'line' + id;
            let self = this;
            // 当不是最后一条记录的时候
            if(index !== length - 1) {
                this.$nextTick(()=>{
                    // 该状态记录的dom高度
                    let height = self.$refs[statusIndex][0].offsetHeight;
                    // line的dom
                    let line = self.$refs[lineIndex][0];
                    // 设置长度，21为margin值
                    line.setAttribute("y2", height + 21);
                })
            }
            // 最后一条记录长度默认为0
            return 20;
        },

        clearMap() {
            this.map.remove(this.amapInstances)
        }

    },
    data() {
        return {
            /**
             * @var {object}
             * @desc window对象
             */
            $window: {},

            /**
             * @var {object}
             * @desc AMap实例
             */
            map: '',

            /**
             * @var {object}
             * @desc 查询条件
             * @property {string} module 任务管理模块（2）
             * @property {string} search 搜索关键词
             * @property {string} startTime 开始时间（yyyy-MM-dd）
             * @property {string} endTime 结束时间（yyyy-MM-dd）
             */
            queryList: {
                module: '',
                search: '',
                startTime: '',
                endTime: '',
                // 其他默认参数
                workId: '',
                page: 1,
                limit: 10
            },

            /**
             * @var {array}
             * @desc 查询返回的结果列表
             */
            teamList: [],

            /**
             * @var {string}
             * @desc 点击列表选中的人的id，没选中（-1）
             */
            selectedId: "-1",

            /**
             * @var {num}
             * @desc 页面切换判断值，列表页面（0），详情页面（1）
             */
            displaySwitch: 0,

            /**
             * @var {object}
             * @desc 查询详情的请求参数
             * @property {string} module 任务模块（2）
             * @property {string} contactorId 查询的人的id
             * @property {num} page 查询第几页的数据
             * @property {num} limit 查询的每页数据量
             * @property {string} search 搜索关键词
             * @property {string} startTime 开始时间（yyyy-MM-dd）
             * @property {string} endTime 结束时间（yyyy-MM-dd）
             * @property {string} workId 任务/工单的id
             */
            queryDetailList: {
                module: "",
                contactorId: "",
                page: 1,
                limit: 10,
                search: "",
                startTime: "",
                endTime: "",
                workId: ""
            },

            /**
             * @var {object}
             * @desc 获取到的人的所有任务详情
             * @desc teamDetail[0]：第一个任务的详情，teamDetail[1]：第二个任务的详情
             */
            teamDetail: [],

            /**
             * @var {array}
             * @desc 详情中这个人所有任务的id和名字集合
             */
            taskList: [],

            /**
             * @var {object}
             * @desc teamList中某一个人的数据，用于详情中显示
             */
            manInList: {},

            // 任务总数
            taskTotal: 0,

            /**
             * @var {array}
             * @desc elementui日期选择器的数据，查询人员列表的请求数据
             * @desc dateRange[0]: startTime
             * @desc dateRange[1]: endTime
             */
            dateRange: [],

            /**
             * @var {array}
             * @desc elementui日期选择器的数据，查询任务详细的请求数据
             * @desc detailDateRange[0]: startTime
             * @desc detailDateRange[1]: endTime
             */
            detailDateRange: [],

            /**
             * @var {array}
             * @desc 当前绘制的定点的集合
             */
            markers: [],

            /**
             * @var {string}
             * @desc 详情中选中的状态记录的id
             */
            selectedStatusId: '-1',

            // icon & infoWindow
            amapInstances: []
        }
    }
}
</script>

<style>
    .team-route-all-container {
        background: transparent;
        color: white;
    }
    .team-route-list-content {
        height: 650px;
        overflow: auto;
    }
    .team-route-list-content::-webkit-scrollbar {
        background: transparent;
        width: 3px;
        height: 3px;
    }
    .team-route-list-content::-webkit-scrollbar-thumb {
        background: #518ce5;
        border-radius: 6px;
    }
    .team-route-detail-tool,
    .team-route-list-tool {
        display: relative;
        height: 50px;
    }
    .team-route-detail-tool-search,
    .team-route-list-tool-search {
        width: 304px;
        height: 27px;
        border: 1px solid rgba(63,146,254,1);
        border-radius: 3px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: transparent;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0,242,255,1);
        outline: none;
        position: absolute;
        left: 240px;
        margin-top: 14px; 
    }
    .team-route-detail-tool-search-inner,
    .team-route-list-tool-search-inner {
        background: transparent;
        border: none;
        outline: none;
        width: 260px;
        height: 26px;
        line-height: 26px;
        color: white;
        padding: 0;
        padding-left: 11px;
    }
    .team-route-detail-tool-search-button,
    .team-route-list-tool-search-button {
        color: rgba(107, 137, 249, 1);
        cursor: pointer;
        position: absolute;
        right: 8px;
        top: 5px;
        display: inline-block;
        width: 14px;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
    }
    .date-range-selector-border {
        position: relative;
        border: solid 1px rgba(63,146,254,1);
        display: inline-block;
        width: 210px;
        height: 26px;
        margin-top: 13px;
        position: absolute;
        left: 15px;
    }
    .team-route-detail-tool /deep/.date-range-selector,
    .team-route-list-tool /deep/.date-range-selector {
        font-size: 14px;
        font-weight: 400;
        height: 26px;
        width: 210px;
        color: rgba(0,242,255,1);
        background: transparent;
        border: none;
        line-height: 26px;
        
    }
    .date-range-selector /deep/.el-range__icon,
    .date-range-selector /deep/.el-range__close-icon,
    .date-range-selector /deep/.el-range-separator {
        line-height: 26px;
        color: white;
        height: 26px;
        padding: 0px;
    }
    .date-range-selector /deep/.el-range-separator{
        padding-right:5px;
    }
    .date-range-selector /deep/.el-range-input {
        width: 80px;
        background: transparent;
        color: white;
        margin-top: 2px;
    }
    .team-route-list-content::first-child {
        margin-top: 100px;
    }
    .team-route-list-item {
        width: 525px;
        margin: 0 auto;
        margin-bottom: 22px;
        border: 2px solid rgba(24, 81, 154, 0.8);
        position: relative;
        background: rgba(24, 81, 154, 0.58);
    }
    .team-route-list-item-selected {
        border: 2px solid rgba(27, 216, 250, 0.8);
    }
    .team-route-list-item-header {
        font-size: 16px;
        color: rgba(0, 242, 255, 1);
        font-weight: bold;
        padding-left: 16px;
        padding-top: 10px;
        position: relative;
    }
    .team-route-list-item-icon-phone {
        position: absolute;
        left: 0px;
        top: 3px;
        cursor: pointer;
    }
    .team-route-list-item-icon-meeting {
        position: absolute;
        left: 30px;
        top: 3px;
        cursor: pointer;
    }
    .team-route-list-item-name{
        margin-left: 50px;
    }
    .team-route-list-item-header-background {
        background:rgba(23, 130, 230, 0.3);
        position: relative;
        width: 525px;
        height: 39px;
    }
    .team-route-list-item-button {
        color: white;
        background: transparent;
        outline: none;
        border: 1px solid rgba(23, 146, 252, 1);
        border-radius: 3px;
        width: 40px;
        height: 22px;
        font-size: 14px;
        padding: 0px;
        position: absolute;
        right: 10px;
        cursor: pointer;
    }
    .team-route-list-item-task {
        padding-left: 17px;
        position: relative;
        margin-bottom: 20px;
        margin-top: 13px;
    }
    .team-route-list-item-task>span:last-child {
        position: absolute;
        right: 18px;
    }
    .team-route-detail-task-single-status-footer,
    .team-route-list-item-footer {
        line-height: 14px;
        height: 14px;
        font-size: 14px;
        color: rgba(179, 208, 249, 1);
        position: relative;
        padding-left: 46px;
        margin-bottom: 15px;
    }
    .team-route-detail-task-single-status-footer>img,
    .team-route-list-item-footer>img {
        position: absolute;
        left: 21px;
        top: -7px;
    }
    .team-route-list-item-footer>span:nth-child(2) {
        width: 330px;
        display: inline-block;
        text-overflow:ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .team-route-list-item-footer>span:last-child {
        position: absolute;
        right: 18px;
    }
    .map-card-container {
        background: rgba(11, 30, 75, 0.8);
        display: relative;
        border: 1px solid #38625c;
        color: white;
        font-size: 16px;
        width: 280px;
        padding-bottom: 13px;
    }
    .map-card-task-name {
        color: rgba(0, 242, 255, 1);
        font-size: 16px;
        margin-top: 11px;
        margin-left: 12px;
    }
    .map-card-man-name {
        margin-top: 9px;
        margin-left: 12px;
    }
    .map-card-time {
        margin-top: 9px;
        margin-left: 10px;
    }
    .map-card-remark {
        margin-top: 8px;
        margin-left: 12px;
    }
    .map-card-container img{
        max-width: 87px;
        max-height: 55px;
    }
    .map-card-img{
        height: 55px;
        margin-left: 12px;
        margin-top: 15px;
    }
    .map-card-file{
        margin-left: 12px;
        margin-top: 15px;
    }
    .map-card-file a{
        color: rgba(4, 118, 255, 1);
    }
    .map-card-file a:hover{
        color: white;
    }
    .team-route-detail-header {
        position: relative;
        padding-top: 13px;
        margin-bottom: 18px;
    }
    .team-route-detail-goback {
        font-size: 19px;
        cursor: pointer;
        position: absolute;
        left: 25px;
        top: 16px;
    }
    .team-route-detail-title {
        font-size: 18px;
        margin: 0 auto;
        color: rgba(0, 242, 255, 1);
        width: 72px;
    }
    .team-route-detail-name {
        font-size: 18px;
        margin-left: 20px;
    }
    .team-route-detail-count {
        font-size: 18px;
        float: right;
        margin-right: 21px;
    }
    .team-route-detail-select-container{
        position: absolute;
        right: 12px;
        top: 12px;
        height: 26px;
        width: 165px;
        border: solid 1px rgba(63,146,254,1);
        background:rgba(6,44,93,1);
    }
    .team-route-detail-select {
        font-size: 14px;
        font-weight: 400;
        height: 26px;
        color: rgba(0,242,255,1);
        background: transparent;
        outline: none;
        line-height: 26px;
        border: none;
        width: 165px;
        text-align: center;
        text-align-last: center;
    }
    .team-route-detail-select option {
        text-align: center;
        background: rgba(11, 30, 75, 1);
    }
    .team-route-detail-task-all-container {
        height: 560px;
        overflow: auto;
        margin-top: 13px;
    }
    .team-route-detail-task-all-container::-webkit-scrollbar {
        background: transparent;
        width: 3px;
        height: 3px;
    }
    .team-route-detail-task-all-container::-webkit-scrollbar-thumb {
        background: #518ce5;
        border-radius: 6px;
    }
    .team-route-detail-task-name {
        margin: 0 auto;
        font-size: 16px;
        font-weight: bold;
        color: white;
        width: 100%;
        text-align:center;
        margin-bottom: 18px;
    }
    .team-route-detail-task-single-status {
        border: solid 1px rgba(24, 81, 154, 0.3);
        background: rgba(24, 81, 154, 0.3);
        position: relative;
        width: 493px;
        margin-bottom: 21px;
        left: 62px;
        cursor: pointer;
    }
    .team-route-detail-task-single-status-selected {
        border: 1px solid rgba(27, 216, 250, 0.8);
    }
    .team-route-detail-task-single-status-time {
        color: white;
        font-size: 16px;
        margin-left: 16px;
        margin-top: 17px;
        margin-bottom: 14px;
    }
    .team-route-detail-task-single-status-remark {
        color: white;
        font-size: 16px;
        margin: 0 18px;
    }
    .team-route-detail-task-single-status-document {
        padding: 0 18px;
    }
    .team-route-detail-task-single-status-file {
        color: rgba(4, 118, 255, 1);
        display: block;
        margin-top: 12px;
    }
    .team-route-detail-task-single-status-file:hover {
        color: white;
    }
    .team-route-detail-task-single-status-img {
        margin-top: 12px;
        height: 80px;
        margin-right: 8px;
    }
    .team-route-detail-task-single-status-footer {
        margin-top: 15px;
    }
    .team-route-detail-task-single-status-point {
        width:20px;
        height:20px;
        border:2px solid rgba(73,149,225,1);
        border-radius:50%;
        cursor: pointer;
        position: absolute;
        left: -47px;
        top: 15px;
    }
    .team-route-detail-task-single-status-point-selected {
        background: rgba(63,125,190,1);
    } 
</style>