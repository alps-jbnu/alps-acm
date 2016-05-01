Teams = new Mongo.Collection('teams');
dueDate = new Date(2016, 5, 20, 0, 0, 0);

Meteor.methods({
    teamInsert: function(team) {
        var createdAt = new Date();
        if (createdAt >= dueDate)
            throw new Meteor.Error('teamInsert failed', '신청 기간이 지났습니다.');

        if (!(team.name &&
              team.leaderName &&
              team.leaderStudentNumber &&
              team.leaderPhoneNumber &&
              team.memberOneName &&
              team.memberTwoName &&
              team.memberOneStudentNumber &&
              team.memberTwoStudentNumber))
            throw new Meteor.Error('teamInsert failed', '입력하지 않은 항목이 있습니다.');

        check(team.name, String);
        check(team.leaderName, String);
        check(team.leaderStudentNumber, String);
        check(team.leaderPhoneNumber, String);
        check(team.memberOneName, String);
        check(team.memberOneStudentNumber, String);
        check(team.memberTwoName, String);
        check(team.memberTwoStudentNumber, String);

        if (team.name.length < 2)
            throw new Meteor.Error('teamInsert failed', '팀명이 너무 짧습니다. (최소 2글자)');
        if (team.name.length > 15)
            throw new Meteor.Error('teamInsert failed', '팀명이 너무 깁니다. (최대 15글자)');
        if (!(/^[0-9]{9}$/.test(team.leaderStudentNumber) &&
              /^[0-9]{9}$/.test(team.memberOneStudentNumber) &&
              /^[0-9]{9}$/.test(team.memberTwoStudentNumber)))
            throw new Meteor.Error('teamInsert failed', '학번은 9글자 숫자여야 합니다.');
        if (team.leaderName.length < 2 ||
            team.memberOneName.length < 2 ||
            team.memberTwoName.length < 2)
            throw new Meteor.Error('teamInsert failed', '이름이 너무 짧습니다.');
        if (team.leaderName.length > 4 ||
            team.memberOneName.length > 4 ||
            team.memberTwoName.length > 4)
            throw new Meteor.Error('teamInsert failed', '이름이 너무 깁니다.');

        var phoneNumberFormat = /^[0-9]{3}[- ]?[0-9]{4}[- ]?[0-9]{4}$/;
        if (!team.leaderPhoneNumber.match(phoneNumberFormat))
            throw new Meteor.Error('teamInsert failed', '연락처로 올바른 휴대 전화번호를 입력해주세요.');

        team = _.extend(team, {
            createdAt: createdAt
        });

        var teamId = Teams.insert(team);

        return {_id : teamId};
    }
});
