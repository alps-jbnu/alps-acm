var DEFAULT_IMAGE_LIMIT = 9;
var MAX_IMAGE_LIMIT = 20;

Template.main.onCreated(function() {
    this.imgLimit = new ReactiveVar();
    this.imgLimit.set(DEFAULT_IMAGE_LIMIT);
});

Template.main.onRendered(function() {
    var nav = $('nav');
    var navBottom = nav.offset().top + nav.height();
    var renderNavbar = function () {
        if ($(this).width() >= 768 && $(this).scrollTop() <= navBottom) {
            nav.removeClass('navbar-fixed-top');
            nav.addClass('navbar-static-top');
        } else {
            nav.removeClass('navbar-static-top');
            nav.addClass('navbar-fixed-top');
        }
    };
    renderNavbar();
    $(window).scroll(renderNavbar);
    $(window).resize(renderNavbar);

    document.title = '전북대학교 컴퓨터공학부 프로그래밍 경진대회';

    var now = new Date();
    if (now >= dueDate)
        $('.disable-overdue').attr('disabled', 'true');
});

Template.main.events({
    'click .goto': function(e) {
        e.preventDefault();

        $("html, body").animate({
            scrollTop: $($.attr(e.target, "href")).offset().top - 120
        }, "slow");
    },
    'click .goto-top': function(e) {
        e.preventDefault();

        $("html, body").animate({
            scrollTop: 0
        }, "slow");
    },
    'click .under-construction': function(e) {
        e.preventDefault();

        alert('죄송합니다. 아직 준비 중입니다.');
    },
    'submit #team-apply-form': function(e) {
        e.preventDefault();

        var team = {
            name: $(e.target).find('[name=name]').val(),
            leaderName: $(e.target).find('[name=leaderName]').val(),
            leaderStudentNumber: $(e.target).find('[name=leaderStudentNumber]').val(),
            leaderPhoneNumber: $(e.target).find('[name=leaderPhoneNumber]').val(),
            memberOneName: $(e.target).find('[name=memberOneName]').val(),
            memberOneStudentNumber: $(e.target).find('[name=memberOneStudentNumber]').val(),
            memberTwoName: $(e.target).find('[name=memberTwoName]').val(),
            memberTwoStudentNumber: $(e.target).find('[name=memberTwoStudentNumber]').val(),
        };

        Meteor.call('teamInsert', team, function(err, res) {
            if (err && err.error === 'teamInsert failed') {
                alert(err.reason);
            } else if (err) {
                alert('등록에 실패했습니다. 다시 시도해주세요.');
            } else {
                $(e.target).find('[name=name]').val('');
                $(e.target).find('[name=leaderName]').val('');
                $(e.target).find('[name=leaderStudentNumber]').val('');
                $(e.target).find('[name=leaderPhoneNumber]').val('');
                $(e.target).find('[name=memberOneName]').val('');
                $(e.target).find('[name=memberOneStudentNumber]').val('');
                $(e.target).find('[name=memberTwoName]').val('');
                $(e.target).find('[name=memberTwoStudentNumber]').val('');
                alert('접수되었습니다. 감사합니다.')
            }
        });
    },
    'click button.unfold-gallery': function(e) {
        Template.instance().imgLimit.set(MAX_IMAGE_LIMIT);
    },
    'click button.fold-gallery': function(e) {
        Template.instance().imgLimit.set(DEFAULT_IMAGE_LIMIT);
    }
});

Template.main.helpers({
    teams: function() {
        return Teams.find();
    },
    blankTeams: function() {
        var cnt = Teams.find().count();
        var minCnt = 6;
        if (cnt < minCnt) {
            var ret = [];
            var insertCnt = minCnt - cnt;
            for (var i = 0; i < insertCnt; i++) {
                ret.push({
                    name: '',
                    leaderName: '',
                    memberOneName: '',
                    memberTwoName: ''
                });
            }
            return ret;
        } else {
            return null;
        }
    },
    images: function() {
        var imgLimit = Template.instance().imgLimit.get();

        var ret = [];
        for (var i = 0; i < imgLimit; i++)
            ret.push({src: 'http://placehold.it/450x300'});
        return ret;
    },
    hasMoreImages: function() {
        var imgLimit = Template.instance().imgLimit.get();

        if (imgLimit < MAX_IMAGE_LIMIT)
            return true;
        else
            return false;
    }
});
