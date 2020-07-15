const Url = "https://jsonplaceholder.typicode.com";

$(function() {
    $("#submit").click(() => {
        const id = $("#input").val();
        getUsers(id);
    });
});

function getUsers(id) {
    $.get(Url + "/users/" + id)
        .done(res => {
            const info = $("<dl>");
            for (data in res) {
                if (typeof(res[data]) != "object") {
                    info.append($("<dt>").text(data));
                    info.append($("<dd>").text(res[data]));
                }
            }
            info.prepend($("<h4>").text("Info"));
            $("#info").html(info);
            getPosts(id);
        });
}

function getPosts(id) {
    $.get(Url + "/posts", { userId: id })
        .done(res => {
            $("#comments").html('Select a post to see comments');
            const posts = $("<div>");
            for (data of res) {
                const lists = data.body.split("\n");
                const post = $("<div>", { class: "post" });
                const content = $("<ul>");
                for (list of lists) {
                    content.append($("<li>").text(list));
                }
                post.append(content);
                post.append($("<input>", { type: "Button", value: "Comments", "data-post-id": data.id }));
                posts.append(post);
            }
            posts.prepend($("<h4>").text("Posts"));
            $("#posts").html(posts)
                .click(event => {
                    const selectedPost = $(event.target).attr("data-post-id");
                    if (selectedPost) {
                        $('.post').removeClass('active');
                        $(event.target).parent().addClass('active');
                        getComments(selectedPost);

                    }
                });
        });
}

function getComments(id) {
    $.get(Url + "/comments", { postId: id })
        .done(res => {
            const comments = $("<div>");
            for (data of res) {
                const lists = data.body.split("\n");
                const content = $("<ul>");

                for (list of lists) {
                    content.append($("<li>").text(list));
                }
                comments.append(content);
            }
            comments.prepend($("<h4>").text("Comments"));
            $("#comments").html(comments);
        });
}