<template>
  <div class="yjdw">
    <el-dialog
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      width="820px"
      :visible.sync="visible"
      title="应急队伍"
    >
      <smsDialog ref="smsDialog"></smsDialog>
      <el-form :model="dataForm" ref="dataForm" label-width="120px">
        <el-form-item label="队伍名称" prop="name">
          <el-input
            v-model="dataForm.name"
            placeholder="队伍名称"
            :readonly="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="队伍负责人">
          <!-- <el-input
            v-model="dataForm.responsiblesName"
            placeholder="队伍负责人"
            :readonly="true"
          ></el-input> -->
          <div
            v-for="(item, index) in dataForm.responsiblesList"
            :key="`responsibility_${index}`"
            style="display:flex;"
          >
            <div>{{item.name}}</div>
            <div>
              <el-tooltip class="item" effect="dark" content="发短信" placement="top">
                <img
                  @click="sendSms(item)"
                  style="cursor: pointer;"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAAD20lEQVRYhaWXXYhNURTH//tjLve6ykf5fOBNIYmUF0lR8nolz/LiI96MTNPkO6Z5oCghhfJ08y2ZFA9TeFESkUdFSh5mblfu2XvrnHvOad1117kzw6rd+djr7P3ba6299jqq/jWCIIq8UqybP09FAtMJ7JqLFSZT7F569y8wQWiKw1EgDqDZlcNNB4g3nzYKk8BlQByENsP6wKC42aW+DCgDcameJ+87LMRhDGlWsFIRTBEUBXLpeFGq54h+4C7LYGza+tKrKXAXnYyC6AI9l7ZWqkt3VAJmBetkIHErpVdD+iUXcOtotgCq22Lvsz4xhgwBmnG3pJffLqkBKGzp4Z6pSgz5dWWEsyeb7imD0RkUBdLMZX23S+okFDbN8njg2tZKxAMhKITkykAVoDSgVGhbIb6P9TTgfmus+WBxGcAK4j5DLATLgpVDLYyVbjbcecH8Lo0Bx2JIk7jT5Du/b5bZ+0NjD9kwXZuFBh/f6mZmwMe4o1Y1N95ZNZ/FEs9NUsvH3F01ZxKYgM9sHArdlVc6BvmjUAUwAYV5x8v6Xn/F7BICtkiS/lNls60227xoKWxAwGu0x5TSSHJPLdSl4IFF8cf1cbdzjsejLwb7a1Vz5Y1VcycL5C9GVXZWzfBbi0EEvK2Pu+2rHJ4DWMKMAMllRTkm3qKV2P/XG254cxSOQGHFubJ+cKxsdrAclO+aobLZ2l/Ro0Fh45oIJ+oT7lD8/rvGMpKVxV3LExgHyiQJ4ENNP3ax4beUPB5/shisVc21JyW9IJvkYUkvqlXN1fcWp3XA6GDTbxtqusdp8EfpAsHOsQ7hpz1Y9g0EKHle6kPrTsMNnSubJ28sLl2foZ69NuZwC7CfLEZi5XURDg403ViPo4aPn0svIJqB6dZOVtffdGPftFp/sKJH3ltcSL98erXhjs4LeV7pAHJsDAmKAgU+qfBM7/1iH6L6hDtwrGy29gGt4033Mu2b7DDmIPm9ZQqBlQTUQpJeonum6UYLJuwACt3f8pqoy2W8ZimyGC+yaBan0rG1fbHL8nEtm4CWCfFzH7EQN7EUA3RCxWEtME7OLhGKu8x3WEi1+4fLZi1beazgfbdFctFCJv+lsJoskLstByqs6OZ73PqpMfDK4kbRxNOUCAH3yUnfBRT/BtFKkVaLWV0kVYvUNZL0qi6zijEi1UIG53gMKWFHTbV8zaTo4KVeiAS3eeoyRZSlFRX9AhUBQdh5PCzoVcxD1AVZcstgpd+f6QjfTY7AdfTxTA3iuuydVLdMFwYClHh8UAvx31qeaf8XSILiwF1nGYfjk/+Py3pBtgXAX7tr7Hp4jZJhAAAAAElFTkSuQmCC"
                  alt
                />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="电话" placement="top">
                <img
                  @click.stop="callPhone(item)"
                  style="cursor: pointer;"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAhCAYAAAC803lsAAAE4klEQVRYha2Yf2iVVRjHv885773v7u5Go1UUq0C2fihUKPmP0R9mEf1T4SVM7ceYWTDDmiIlFDbDsI1orcIyLDLBLb2MIpJhUWOhRpRWNipK0SIkS6Xd3V1333NOnJf3ncdzz3t3kw48nL3nnh+f93me8zzPO8r/HmCGRlV+VjMtrrV5jnlk9XDAKGNcWWP/CwhZIGSNmSAq4fALAjJBzANZ9MwcMMoSaR1uQttQiZAu0zCHuEBkJFSDhmY0pWdMiDUQC4+EGZpxgcgaQWQ1f7JByILwImHWG2kRFgwch5gQZMBIe67tI6Y29G9p3T+a5cv+ZlivJ2UltmyfEFsiEGFpxPW20phLSZrxLE2YMKE22rO8c5xh/TUCnb5C6bCHt+9v4JcMFMQLAAIHiG0WYZwRRGNk9dMqj9t5jjqSomYN0SqwZnNRfNY9KQ7cEmB5mbCyP8NuMEyXirQXSkeWP5Jr5MPReMowL3P4HGDZ3nZY/qrP1gI42VMUw9FmfM2k+A4Ke0c8escAMYG814piQPe5Br47GuOGOCN1UhwJ/1aEBSmFT3Fug/D3fEGsyzXyQ+/5rO3Bs/LITp9d9TWnubE5MgqFVoE3fuXozzXykXvK6r6HSvJ4ZCY7HFSA2EChcDXt8dMb7PBZm554hcSU3uMgp3lHOZ6xvOMYgKMAZo0xagXwW0L6SAQ559EKv5QIc027nmDkD6VpW0rho9vL8i893lMUewDsMfaQ7/vsysE0DUNhaGNR7E8CiJvprGZQCm/CokC9AsLs0RRdHG/0Uh27F0DDQEF0W443re4AoME0DZHCkDZjuobEyIwJFTmksyR/BPBzXx17Mx6fLdUPesG3Hl2UkItwjJN/Y4AndxfE0zNEXTJBbE2YAShYVVIPA2jbkOGL9JyOkhyDwvcbM+xdx3UMN24VqrRhUow68owLguAwjbRE3FaWf7YIPHvYQ++XHjXpeTsmxGMAWlZkeZcjLrgOdEmFRlz+EWtFR8KgX8cFhf09GfZJdD3FXWW18gzDsifqebuZnw551NSR5V2r6/lSRzlhm3Jai3GpWBHM7GipJdfID0DhZL4glut5mzJ84TceNnOFvbcKtWsK5O3z0K+DYHQjgwUBHl87KQ4C4VXXUo4kMBOnWbPa2bcidOtnHcgA/JEfF0v0mtEUXdrns24QZgHINEvs3DohNIxcmuVPTTE80Czx3NYJsS0BRCSBJMGE/RlCZkUD/wrAqfy4uDtePMapYYLA5wfqtGFaua6e33mE4+XLBVa9XhR5B0iYCKvFEdNP4sXlJoXJwXExTy/INfLPd/msRc+bI9Q/8wN1yi6WeoviY67w1gmOHsf1dd4aF4wNEtrZA87mx8VCKIwOpOnD1fV8iVUonbePINwBhX3VAlrSd43LeT0jpcc976rni49z9Oq8cl2AvvYp+cW1QhX1odvr2NUfpEgXUZc9X5Q3zRGqYJjF9BFVDQQJMLHEz0yngD6fvQjCzVBhcvsphNXPwOlNRbn4+mSIiltTK4wtScWO7W/m4YEdPF3Z19yIjM3McWnUFtVAYEfqhOrfWQbYMHGT1lu68gwZ8EkwFRC1gCQBkQVV7dMUxsH2japZI0kwdiVul5mwtFJx8IVqxASwIeLDZ/r3hW0u5yfnf23mZqZPuGBsTVY2AP8ChXtUJKSdmwwAAAAASUVORK5CYII="
                  alt
                />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="会议" placement="top">
                <img
                  @click="createMeeting(item)"
                  style="cursor: pointer;"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAFaElEQVRYha1YbYhUVRh+3nPuzN7ZnRU/clOxtoLcfihihBsbpViQ/RCyMcwiqUz/iCFSWmiIJBgZSUVEYAapJegQBmL/LNFCLEIUi9K1dNXNDLWZdmZn7j0n7uy52zuvd3ZN9sC7995zzz33med93o+7lO8JcBODhnjE3syG0fD+x1oSRwhQls1ZMTeiYEgYn+NgbIPzEQMjgShnjcAYZxD3RgQMB6UZmNjiEYMgdj3ibuJsaGGKaSR6eegsmosj44ZBDQeGuycGknLPee6aGCsRgKp71jYQdcOhhlvAmNEMRPqER2NyWb0316q7c1n92V8KzdE8A1vnylyrrtnNgpGijVmJXuiv99VOECbMCLAShJnLmvWH0TyAJrcuxdjT+UKoIksQ/rBgJIiYkZR7WRMI00cbfL2uFB6FxfcgPMDANAmWtBA/JUVkkmaSwlgzMDV2OgOsPuLhjVxWTwXh7seqdoUDYITFWgmZmGVOSmQmCQhnxYt/8epSeOTeAFt8i2sPBdj4Ytn84u4lmRS9Sshf4LUpSSMe2zhyQSTSzJIWvfaqwuOw6AHQX5sntN0VYtvmvnAbgLKbj6ziIixwFjKWDGfLG4IRycrgr7uqML/N4MvZgT1IA+vsnhQ91a2xGMAOkVuGy9rxtZWake7h4uXWt6Bi9z1cNRdjV59T+sC3GpMd6BiISgBCDEidfmI3KSFWzSKn5qJ3M/r+wxrPhsBtIHQAKMLi0uDmhDtqfy1OC4Ga2uzAKOYL4Tzmuip3mydaAwmoxkYuq98D4VEAZ32DU5MNDpWA8T5Q8i3KfYSsAY41AcU/CRMtYELApIG/my3+qBLIzVfcnnHpUKyoktSMBKJzWb0dhK45Vfv88rL5meeQKwR/u69mvtRnvhtk4b9fWrO3MrqrPbTdC/vNSSdozwlZCSJs5CbiL+chvLxFL+5V2PRcv507r2IuOxA1MFsyevYhD68BuAJgzIKKXbeo35yIAf2qqeXVjHofhAyAUaMNdn78T/gmgJKzsog0o4S66yKqV2E9LPbNq5heKcQIyASD/flC+ELK4vieNK3hrL7jqyUgjM8XwgULK3bpVYVnDqboVpGN60StBAhpfleI3Ym1xOJ8L6Fjf1q1VwntKYszPILaDC5Exy/SasphTbOiG2NtnXuuq1HDVu1R1hbrIDjLF8NlvsXlrWlaOc7gh13FcANbgw2lcO/UAFt3pOmVHoXOVWUzf2pgC8ILdUOJF113flzRdFlLjno0dlNGPzLJ4nSzxcU2g/NvZ/Sss4qa43VbMvpBAoxvcW6cxcn9nur8yFfTGrxvAF2+J5DZNs646VxW7wJhRr4QdtXNt+o9ANpg0e0ipAWE25XFid3FcO2aZr3wlMbTkSsBXKvtT2iPSkm+EHYwEVec1cqEJ6qnYUezvN+u+MCnH5/M6o27i+HrDnQUsm1zq/blpWVzLNbIuox+4icPi6Lo+F2hAxbH88VwFev++nOt+itZjzgzHgMSW9zDhnOq5q9Dnl50zMPnuVY9bUqIT+4x9rfogVOK7jyQogsWpFOw9pLCxGi/b1J0SxXIRixE52WiKAFWz6janMdykGwlEOeZpIQ3WLH3ptWkT9O0GYRO5xabkEVT7rzkKjzcWsUKYjVfCO9jFX0wx0R78drEAamkai2SY6MCyAUasxAwd1VEshtsJ7ibuG7A3MVZ0CyVDwWE72UEoICxUacdCUZ+CfJN5QecBJLEjGxBA1G76jST1APHgLjAFNMHb6aTQMi9ZJQmdnmyubJiE2ILucjRwDVJ/5GwgnUrwA3JjMyKHIwEMRQjSftd19nJY6PPWw6C97J83AgYCSgJ4MAA8C9IEUFPQyqzUAAAAABJRU5ErkJggg=="
                  alt
                />
              </el-tooltip>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="队伍联系人">
          <!-- <el-input
            v-model="dataForm.contactsName"
            placeholder="队伍联系人"
            :readonly="true"
          ></el-input> -->
          <div
            v-for="(item, index) in dataForm.contactsList"
            :key="`contactors_${index}`"
            style="display:flex;"
          >
            <div>{{item.name}}</div>
            <div>
              <el-tooltip class="item" effect="dark" content="发短信" placement="top">
                <img
                  @click="sendSms(item)"
                  style="cursor: pointer;"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAAD20lEQVRYhaWXXYhNURTH//tjLve6ykf5fOBNIYmUF0lR8nolz/LiI96MTNPkO6Z5oCghhfJ08y2ZFA9TeFESkUdFSh5mblfu2XvrnHvOad1117kzw6rd+djr7P3ba6299jqq/jWCIIq8UqybP09FAtMJ7JqLFSZT7F569y8wQWiKw1EgDqDZlcNNB4g3nzYKk8BlQByENsP6wKC42aW+DCgDcameJ+87LMRhDGlWsFIRTBEUBXLpeFGq54h+4C7LYGza+tKrKXAXnYyC6AI9l7ZWqkt3VAJmBetkIHErpVdD+iUXcOtotgCq22Lvsz4xhgwBmnG3pJffLqkBKGzp4Z6pSgz5dWWEsyeb7imD0RkUBdLMZX23S+okFDbN8njg2tZKxAMhKITkykAVoDSgVGhbIb6P9TTgfmus+WBxGcAK4j5DLATLgpVDLYyVbjbcecH8Lo0Bx2JIk7jT5Du/b5bZ+0NjD9kwXZuFBh/f6mZmwMe4o1Y1N95ZNZ/FEs9NUsvH3F01ZxKYgM9sHArdlVc6BvmjUAUwAYV5x8v6Xn/F7BICtkiS/lNls60227xoKWxAwGu0x5TSSHJPLdSl4IFF8cf1cbdzjsejLwb7a1Vz5Y1VcycL5C9GVXZWzfBbi0EEvK2Pu+2rHJ4DWMKMAMllRTkm3qKV2P/XG254cxSOQGHFubJ+cKxsdrAclO+aobLZ2l/Ro0Fh45oIJ+oT7lD8/rvGMpKVxV3LExgHyiQJ4ENNP3ax4beUPB5/shisVc21JyW9IJvkYUkvqlXN1fcWp3XA6GDTbxtqusdp8EfpAsHOsQ7hpz1Y9g0EKHle6kPrTsMNnSubJ28sLl2foZ69NuZwC7CfLEZi5XURDg403ViPo4aPn0svIJqB6dZOVtffdGPftFp/sKJH3ltcSL98erXhjs4LeV7pAHJsDAmKAgU+qfBM7/1iH6L6hDtwrGy29gGt4033Mu2b7DDmIPm9ZQqBlQTUQpJeonum6UYLJuwACt3f8pqoy2W8ZimyGC+yaBan0rG1fbHL8nEtm4CWCfFzH7EQN7EUA3RCxWEtME7OLhGKu8x3WEi1+4fLZi1beazgfbdFctFCJv+lsJoskLstByqs6OZ73PqpMfDK4kbRxNOUCAH3yUnfBRT/BtFKkVaLWV0kVYvUNZL0qi6zijEi1UIG53gMKWFHTbV8zaTo4KVeiAS3eeoyRZSlFRX9AhUBQdh5PCzoVcxD1AVZcstgpd+f6QjfTY7AdfTxTA3iuuydVLdMFwYClHh8UAvx31qeaf8XSILiwF1nGYfjk/+Py3pBtgXAX7tr7Hp4jZJhAAAAAElFTkSuQmCC"
                  alt
                />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="电话" placement="top">
                <img
                  @click.stop="callPhone(item)"
                  style="cursor: pointer;"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAhCAYAAAC803lsAAAE4klEQVRYha2Yf2iVVRjHv885773v7u5Go1UUq0C2fihUKPmP0R9mEf1T4SVM7ceYWTDDmiIlFDbDsI1orcIyLDLBLb2MIpJhUWOhRpRWNipK0SIkS6Xd3V1333NOnJf3ncdzz3t3kw48nL3nnh+f93me8zzPO8r/HmCGRlV+VjMtrrV5jnlk9XDAKGNcWWP/CwhZIGSNmSAq4fALAjJBzANZ9MwcMMoSaR1uQttQiZAu0zCHuEBkJFSDhmY0pWdMiDUQC4+EGZpxgcgaQWQ1f7JByILwImHWG2kRFgwch5gQZMBIe67tI6Y29G9p3T+a5cv+ZlivJ2UltmyfEFsiEGFpxPW20phLSZrxLE2YMKE22rO8c5xh/TUCnb5C6bCHt+9v4JcMFMQLAAIHiG0WYZwRRGNk9dMqj9t5jjqSomYN0SqwZnNRfNY9KQ7cEmB5mbCyP8NuMEyXirQXSkeWP5Jr5MPReMowL3P4HGDZ3nZY/qrP1gI42VMUw9FmfM2k+A4Ke0c8escAMYG814piQPe5Br47GuOGOCN1UhwJ/1aEBSmFT3Fug/D3fEGsyzXyQ+/5rO3Bs/LITp9d9TWnubE5MgqFVoE3fuXozzXykXvK6r6HSvJ4ZCY7HFSA2EChcDXt8dMb7PBZm554hcSU3uMgp3lHOZ6xvOMYgKMAZo0xagXwW0L6SAQ559EKv5QIc027nmDkD6VpW0rho9vL8i893lMUewDsMfaQ7/vsysE0DUNhaGNR7E8CiJvprGZQCm/CokC9AsLs0RRdHG/0Uh27F0DDQEF0W443re4AoME0DZHCkDZjuobEyIwJFTmksyR/BPBzXx17Mx6fLdUPesG3Hl2UkItwjJN/Y4AndxfE0zNEXTJBbE2YAShYVVIPA2jbkOGL9JyOkhyDwvcbM+xdx3UMN24VqrRhUow68owLguAwjbRE3FaWf7YIPHvYQ++XHjXpeTsmxGMAWlZkeZcjLrgOdEmFRlz+EWtFR8KgX8cFhf09GfZJdD3FXWW18gzDsifqebuZnw551NSR5V2r6/lSRzlhm3Jai3GpWBHM7GipJdfID0DhZL4glut5mzJ84TceNnOFvbcKtWsK5O3z0K+DYHQjgwUBHl87KQ4C4VXXUo4kMBOnWbPa2bcidOtnHcgA/JEfF0v0mtEUXdrns24QZgHINEvs3DohNIxcmuVPTTE80Czx3NYJsS0BRCSBJMGE/RlCZkUD/wrAqfy4uDtePMapYYLA5wfqtGFaua6e33mE4+XLBVa9XhR5B0iYCKvFEdNP4sXlJoXJwXExTy/INfLPd/msRc+bI9Q/8wN1yi6WeoviY67w1gmOHsf1dd4aF4wNEtrZA87mx8VCKIwOpOnD1fV8iVUonbePINwBhX3VAlrSd43LeT0jpcc976rni49z9Oq8cl2AvvYp+cW1QhX1odvr2NUfpEgXUZc9X5Q3zRGqYJjF9BFVDQQJMLHEz0yngD6fvQjCzVBhcvsphNXPwOlNRbn4+mSIiltTK4wtScWO7W/m4YEdPF3Z19yIjM3McWnUFtVAYEfqhOrfWQbYMHGT1lu68gwZ8EkwFRC1gCQBkQVV7dMUxsH2japZI0kwdiVul5mwtFJx8IVqxASwIeLDZ/r3hW0u5yfnf23mZqZPuGBsTVY2AP8ChXtUJKSdmwwAAAAASUVORK5CYII="
                  alt
                />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="会议" placement="top">
                <img
                  @click="createMeeting(item)"
                  style="cursor: pointer;"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAFaElEQVRYha1YbYhUVRh+3nPuzN7ZnRU/clOxtoLcfihihBsbpViQ/RCyMcwiqUz/iCFSWmiIJBgZSUVEYAapJegQBmL/LNFCLEIUi9K1dNXNDLWZdmZn7j0n7uy52zuvd3ZN9sC7995zzz33med93o+7lO8JcBODhnjE3syG0fD+x1oSRwhQls1ZMTeiYEgYn+NgbIPzEQMjgShnjcAYZxD3RgQMB6UZmNjiEYMgdj3ibuJsaGGKaSR6eegsmosj44ZBDQeGuycGknLPee6aGCsRgKp71jYQdcOhhlvAmNEMRPqER2NyWb0316q7c1n92V8KzdE8A1vnylyrrtnNgpGijVmJXuiv99VOECbMCLAShJnLmvWH0TyAJrcuxdjT+UKoIksQ/rBgJIiYkZR7WRMI00cbfL2uFB6FxfcgPMDANAmWtBA/JUVkkmaSwlgzMDV2OgOsPuLhjVxWTwXh7seqdoUDYITFWgmZmGVOSmQmCQhnxYt/8epSeOTeAFt8i2sPBdj4Ytn84u4lmRS9Sshf4LUpSSMe2zhyQSTSzJIWvfaqwuOw6AHQX5sntN0VYtvmvnAbgLKbj6ziIixwFjKWDGfLG4IRycrgr7uqML/N4MvZgT1IA+vsnhQ91a2xGMAOkVuGy9rxtZWake7h4uXWt6Bi9z1cNRdjV59T+sC3GpMd6BiISgBCDEidfmI3KSFWzSKn5qJ3M/r+wxrPhsBtIHQAKMLi0uDmhDtqfy1OC4Ga2uzAKOYL4Tzmuip3mydaAwmoxkYuq98D4VEAZ32DU5MNDpWA8T5Q8i3KfYSsAY41AcU/CRMtYELApIG/my3+qBLIzVfcnnHpUKyoktSMBKJzWb0dhK45Vfv88rL5meeQKwR/u69mvtRnvhtk4b9fWrO3MrqrPbTdC/vNSSdozwlZCSJs5CbiL+chvLxFL+5V2PRcv507r2IuOxA1MFsyevYhD68BuAJgzIKKXbeo35yIAf2qqeXVjHofhAyAUaMNdn78T/gmgJKzsog0o4S66yKqV2E9LPbNq5heKcQIyASD/flC+ELK4vieNK3hrL7jqyUgjM8XwgULK3bpVYVnDqboVpGN60StBAhpfleI3Ym1xOJ8L6Fjf1q1VwntKYszPILaDC5Exy/SasphTbOiG2NtnXuuq1HDVu1R1hbrIDjLF8NlvsXlrWlaOc7gh13FcANbgw2lcO/UAFt3pOmVHoXOVWUzf2pgC8ILdUOJF113flzRdFlLjno0dlNGPzLJ4nSzxcU2g/NvZ/Sss4qa43VbMvpBAoxvcW6cxcn9nur8yFfTGrxvAF2+J5DZNs646VxW7wJhRr4QdtXNt+o9ANpg0e0ipAWE25XFid3FcO2aZr3wlMbTkSsBXKvtT2iPSkm+EHYwEVec1cqEJ6qnYUezvN+u+MCnH5/M6o27i+HrDnQUsm1zq/blpWVzLNbIuox+4icPi6Lo+F2hAxbH88VwFev++nOt+itZjzgzHgMSW9zDhnOq5q9Dnl50zMPnuVY9bUqIT+4x9rfogVOK7jyQogsWpFOw9pLCxGi/b1J0SxXIRixE52WiKAFWz6janMdykGwlEOeZpIQ3WLH3ptWkT9O0GYRO5xabkEVT7rzkKjzcWsUKYjVfCO9jFX0wx0R78drEAamkai2SY6MCyAUasxAwd1VEshtsJ7ibuG7A3MVZ0CyVDwWE72UEoICxUacdCUZ+CfJN5QecBJLEjGxBA1G76jST1APHgLjAFNMHb6aTQMi9ZJQmdnmyubJiE2ILucjRwDVJ/5GwgnUrwA3JjMyKHIwEMRQjSftd19nJY6PPWw6C97J83AgYCSgJ4MAA8C9IEUFPQyqzUAAAAABJRU5ErkJggg=="
                  alt
                />
              </el-tooltip>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="队伍类型" prop="teamTypeParentName">
          <el-input
            v-model="dataForm.teamTypeParentName"
            v-popover:eventTypeListPopover
            placeholder="选择分组"
            :readonly="true"
          ></el-input>
          <el-input
            v-show="false"
            v-model="dataForm.teamTypeId"
            :readonly="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="队伍单位">
          <el-input
            v-model="dataForm.unitParentName"
            v-popover:eventTypeListPopover
            placeholder="选择分组"
            :readonly="true"
          ></el-input>
          <el-input
            v-show="false"
            v-model="dataForm.groupId"
            :readonly="true"
          ></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="队伍人数">
              <el-input
                v-model="dataForm.peopleNumber"
                placeholder="队伍人数"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成立时间" style="margin-left: 54px;">
              <el-date-picker
                unlink-panels
                v-model="dataForm.creationTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :readonly="true"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="传真">
              <el-input
                v-model="dataForm.fax"
                placeholder="传真"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="应急时间" prop="preparationTime">
              <el-input v-model="dataForm.preparationTime" placeholder="应急准备时间(分钟)"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="8">
            <el-form-item label="电话">
              <el-input
                v-model="dataForm.telephoneNum"
                placeholder="值班电话"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="应急通讯方式">
              <el-input
                v-model="dataForm.communicationMethod"
                placeholder="请输入应急通讯方式"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="机密">
              <!-- <el-input v-model="dataForm.secretLevel" placeholder="机密等级  1机密 2秘密 3限制  4公开  5其他"></el-input> -->
              <el-select
                v-model="dataForm.secretLevel"
                placeholder="请选择"
                :disabled="true"
              >
                <el-option
                  v-for="item in secretLevelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮政编码">
              <el-input
                v-model="dataForm.postalCode"
                placeholder="请输入邮政编码"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="应急准备时间">
              <el-input
                v-model="dataForm.preparationTime"
                placeholder="请输入应急准备时间"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="等级">
              <el-input
                v-model="dataForm.qualificationLevel"
                placeholder="资质等级"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性质">
              <el-select
                v-model="dataForm.nature"
                placeholder="请选择"
                :disabled="true"
              >
                <el-option
                  v-for="item in natureOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="级别">
              <!-- <el-input v-model="dataForm.level" placeholder="级别  1:国家级2:省级3:市级 4:县级 5:乡镇级 5:其他"></el-input> -->
              <el-select
                v-model="dataForm.level"
                placeholder="请选择"
                :disabled="true"
              >
                <el-option
                  v-for="item in levelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--<el-col :span="6">
            <el-form-item label="机密" >
              &lt;!&ndash; <el-input v-model="dataForm.secretLevel" placeholder="机密等级  1机密 2秘密 3限制  4公开  5其他"></el-input> &ndash;&gt;
              <el-select v-model="dataForm.secretLevel" placeholder="请选择">
                <el-option
                  v-for="item in secretLevelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
        </el-row>

        <!--<el-form-item label="邮政编码" >
          <el-input v-model="dataForm.postalCode" placeholder="邮政编码"></el-input>
        </el-form-item>-->

        <el-form-item label="地址">
          <el-input
            v-model="dataForm.address"
            placeholder="地址"
            style="width: 90%"
            :readonly="true"
          ></el-input>
          <el-button
            @click="mapDialogVisible = true"
            style="width:8%"
            type="text"
            icon="el-icon-location-outline"
            v-if="false"
            >定位</el-button
          >
        </el-form-item>

        <!--<el-form-item label="单位地址" >
          <el-input v-model="dataForm.unitAddress" placeholder="单位地址"></el-input>
        </el-form-item>-->
        <el-form-item label="职责">
          <el-input
            type="textarea"
            :rows="2"
            v-model="dataForm.duties"
            placeholder="主要职责"
            :readonly="true"
            resize="none"
          ></el-input>
        </el-form-item>

        <el-form-item label="装备">
          <el-input
            type="textarea"
            :rows="2"
            v-model="dataForm.equipment"
            placeholder="装备描述"
            :readonly="true"
            resize="none"
          ></el-input>
        </el-form-item>

        <el-form-item label="专长">
          <el-input
            type="textarea"
            :rows="2"
            v-model="dataForm.specialty"
            placeholder="专长"
            :readonly="true"
            resize="none"
          ></el-input>
        </el-form-item>

        <el-form-item label="经历">
          <el-input
            type="textarea"
            :rows="2"
            v-model="dataForm.rescueExperience"
            placeholder="应急救援经历"
            :readonly="true"
            resize="none"
          ></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="2"
            v-model="dataForm.remark"
            placeholder="备注"
            :readonly="true"
            resize="none"
          ></el-input>
        </el-form-item>

        <!--<el-form-item label="通讯方式" >
          <el-input v-model="dataForm.communicationMethod" placeholder="应急通讯方式"></el-input>
        </el-form-item>-->
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import smsDialog from './smsDialog';
export default {
  components: {
    smsDialog
  },
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        name: "",
        teamTypeId: "",
        peopleNumber: "",
        qualificationLevel: "",
        creationTime: "",
        nature: "",
        level: "",
        secretLevel: "",
        areaCode: "",
        postalCode: "",
        fax: "",
        longitude: "",
        latitude: "",
        address: "",
        duties: "",
        specialty: "",
        equipment: "",
        remark: "",
        groupId: "",
        unitAddress: "",
        coordinateType: "",
        preparationTime: "",
        telephoneNum: "",
        rescueExperience: "",
        communicationMethod: "",
        isDeleted: "",
        createUserId: "",
        gmtCreate: "",
        modifiedUserId: "",
        gmtModified: "",
        platformId: "",
        teamTypeParentName: "",
        unitParentName: "",
        responsiblesName: "",
        responsibles: [],
        responsiblesList: [],
        contactsName: "",
        contacts: [],
        contactsList: [],
        communicationMethod: "",
        postalCode: "",
        preparationTime: "",
      },

      natureOptions: [
        {
          value: 1,
          label: "专职"
        },
        {
          value: 2,
          label: "兼职"
        },
        {
          value: 3,
          label: "专业自愿者"
        }
      ],
      levelOptions: [
        {
          value: 1,
          label: "国家级"
        },
        {
          value: 2,
          label: "省级"
        },
        {
          value: 3,
          label: "市级"
        },
        {
          value: 4,
          label: "县级"
        },
        {
          value: 5,
          label: "其他"
        }
      ],
      secretLevelOptions: [
        {
          value: 1,
          label: "机密"
        },
        {
          value: 2,
          label: "秘密"
        },
        {
          value: 3,
          label: "限制"
        },
        {
          value: 4,
          label: "公开"
        },
        {
          value: 5,
          label: "其他"
        }
      ]
    };
  },
  props: [],
  methods: {
    init(data) {
      this.dataForm.id = data.resoureTeam.id;
      this.dataForm.name = data.resoureTeam.name;
      this.dataForm.teamTypeId = data.resoureTeam.teamTypeId;
      this.dataForm.peopleNumber = data.resoureTeam.peopleNumber;
      this.dataForm.qualificationLevel = data.resoureTeam.qualificationLevel;
      this.dataForm.creationTime = data.resoureTeam.creationTime;
      this.dataForm.nature = data.resoureTeam.nature;
      this.dataForm.level = data.resoureTeam.level;
      this.dataForm.secretLevel = data.resoureTeam.secretLevel;
      this.dataForm.areaCode = data.resoureTeam.areaCode;
      this.dataForm.postalCode = data.resoureTeam.postalCode;
      this.dataForm.fax = data.resoureTeam.fax;
      this.dataForm.longitude = data.resoureTeam.longitude;
      this.dataForm.latitude = data.resoureTeam.latitude;
      this.dataForm.address = data.resoureTeam.address;
      this.dataForm.duties = data.resoureTeam.duties;
      this.dataForm.specialty = data.resoureTeam.specialty;
      this.dataForm.equipment = data.resoureTeam.equipment;
      this.dataForm.remark = data.resoureTeam.remark;
      this.dataForm.groupId = data.resoureTeam.groupId;
      this.dataForm.unitAddress = data.resoureTeam.unitAddress;
      this.dataForm.coordinateType = data.resoureTeam.coordinateType;
      this.dataForm.preparationTime = data.resoureTeam.preparationTime;
      this.dataForm.telephoneNum = data.resoureTeam.telephoneNum;
      this.dataForm.rescueExperience = data.resoureTeam.rescueExperience;
      this.dataForm.communicationMethod = data.resoureTeam.communicationMethod;
      this.dataForm.isDeleted = data.resoureTeam.isDeleted;
      this.dataForm.createUserId = data.resoureTeam.createUserId;
      this.dataForm.gmtCreate = data.resoureTeam.gmtCreate;
      this.dataForm.modifiedUserId = data.resoureTeam.modifiedUserId;
      this.dataForm.gmtModified = data.resoureTeam.gmtModified;
      this.dataForm.platformId = data.resoureTeam.platformId;
      this.dataForm.teamTypeParentName = data.resoureTeam.teamTypeName;
      this.dataForm.unitParentName = data.resoureTeam.groupName;
      this.dataForm.communicationMethod = data.resoureTeam.communicationMethod;
      this.dataForm.postalCode = data.resoureTeam.postalCode;
      this.dataForm.preparationTime = data.resoureTeam.preparationTime;
      this.dataForm.responsiblesName = "";
      this.dataForm.contactsName = "";
      data.resoureTeam.responsiblesList ? data.resoureTeam.responsiblesList.forEach(item => {
        this.dataForm.responsiblesName =
          this.dataForm.responsiblesName + " " + item.name;
        this.dataForm.responsibles.push(item.id);
      }) : null;
      data.resoureTeam.contactsList ? data.resoureTeam.contactsList.forEach(item => {
        this.dataForm.contactsName =
          this.dataForm.contactsName + " " + item.name;
        this.dataForm.contacts.push(item.id);
      }) : null;
      this.dataForm.responsiblesList = data.resoureTeam.responsiblesList;
      this.dataForm.contactsList = data.resoureTeam.contactsList;
      this.visible = true;
      console.log("表单数据", this.dataForm);
    },

    sendSms(data) {
      let self = this
      this.$nextTick(_ => {
        self.$refs.smsDialog.init(data)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.yjdw {
  /deep/ .el-dialog {
    background: rgba(10, 29, 81, .8);
    border: 1px solid #3B75DE;
    padding: 0;
    color: white;
    &__header {
      background: linear-gradient(to right, #3B75DE, transparent, #3B75DE);
      padding: 10px 20px;
      &btn {
        background: no-repeat center/100% 100% url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAgACADAREAAhEBAxEB/8QAGQAAAwADAAAAAAAAAAAAAAAAAQoLBQYJ/8QAIRAAAgIDAQADAQEBAAAAAAAABQYDBAIHCAEJChUWESX/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A5C/Xx+vkR+UskU6L6LKM6Bxnr9oxXcIl7GrRat/NVGpclOqSkektyWVJeUrUgD1tbcgJH9PwjZV1ezVO1S5dZCl5zXwZxnx8tiVfmnmjT2oqQYfWGwFFhJD4t9+CrF5FhOwPd+vddGcjL557naKMR4mSuTZyTWrUssmeeQDpbgrjLsNaLq3S3NGntuUjQ6yMnLMyUH/sR8FqL2LOdefB9ek6rBGLz3zOoVXT4wlTmwjnq2opY8M/Ame/YM+voZ+LM0P6H53IMT/xS/sUS/hmwS177loVyv18JBaa5FI5IZWdZZ5YCkqY6RiqmVXOr/Jtf/b/ABDbiFMLgvmpa484y5o5pVhA8NS1Hp5KWSsA2tHVgIOH49cg+MM+EXnnkpFndbp9iK2pPc5rhInatTySSy55+grDvzc3d/14vkHfehNvu22ev/iL7a3EZZXQqdKE3Bw5lfXcxHey8g9uQ2fF4mrQT2BimDG2RqdtdDFwh/IBDsujsg4bNzR1B8g/z6/IWjb554fducZfEZxjtoWboGgRMuoNXW7UqFJLky+ehqRQVHCq4VoK4txSC05RH1iiFZK5OA09nIsLwM8d6c0LfYnGfS3M7SKoF6W3tPuiwKiIV47MI9w9ETkERhgxk8/yIgsOtIAwjLOHuEtUgMrWIs8JI8cvAHBPSy32JxjzP0urlqBelt3TyUzFZR1iOzCPcfyK458Xp84/ffIyCw60T68TrZ+YS1SIyzXmwwkjyx8BWnfvLHyE/YH+Q121R06gbe4w+JPi/bZkBGmsAw0mtnT7OrEcB3p0XnanioOdxxrQWyC7sQPXKourUAxjVWbZ1yOkCRwM/wA86A78+v537r/n7RaNtvsv4h+ztvDV1YBAhhNwdeS3ZyKzQzXiEtaSaJaqrME2JlsZisQxJ2Uki7ZS1MDewdqSAGd+9ellvjzjLpfpZpLjw1LUennVmFTkrMVWAg4/kWByGvQZy+/5KRZ3a8AXRVXDzOa4SJ1a0EcksuGGQTPfr5/YKM/FkaI88dDjmJ/4q2CxyMMuK/FAQctDOV+tnCUck0XJjBIzrLPLAKidEuUpVzq5U/6tT/7f7YRxCmHzV3rxl2GtiGnmnpfT23KRkfWJQCll1D/2I+C1F5LhAwoZCxRdVgjH577haFMQAWSqTYSQ2asUuGeHgDpfvbjLjtbKtHS/S+ntRUxFCwRlEszoI/sSENaP2TOBfQx9i86sxCTzzzCsMXgBMhalywir1pJM8cfQmhfYN+wYS+U0oK5351FtWvuM9fM+bDn6xZ1KTTv1rpVakQJvbgMNOSypgFKxIewUlLxgJYkfCMDQz16p2sJELIf/2Q==');
        top: 12px;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        display: block;
        font-size: 0;
      }
    }
    &__title {
      color: #0EF3FE;
      font-size: 20px;
      font-weight: bold;
      text-shadow: 0 0 5px #0EF3FE;
    }
    &__body {
      padding-left: 0;
    }
  }

  /deep/ .el-form-item__label {
    color: #B0E4FF;
    font-size: 14px;
  }

  /deep/ .el-input__inner,
  /deep/ .el-textarea__inner {
    background: transparent;
    border: 1px solid #4390FB;
    color: #9598A1;
    font-size: 14px;
  }
}
</style>
