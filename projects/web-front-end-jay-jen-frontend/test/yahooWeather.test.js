describe("Giphy search example", function () {
    beforeEach(() => {
        fixture.setBase("test");
        fixture.load("search.fixture.html");
    });

    afterEach(() => {
        fixture.cleanup();
    });
    describe("API calls", () => {
        var request;

        beforeEach(() => {
            jasmine.Ajax.install();

            $("#city").val("Los Angeles");
            $("#search-button1").click();

            request = jasmine.Ajax.requests.mostRecent();
        });

        afterEach(() => {
            jasmine.Ajax.uninstall();
        });

        it("should trigger a Giphy search when the search button is clicked", () => {
            expect(request.url).toBe("http://api.giphy.com/v1/gifs/search?rating=pg-13&q=hello&api_key=dc6zaTOxFJmzC");
        });

        it("should populate the image container when search results arrive", () => {
            expect($(".image-result-container").children().length).toBe(0);

            // To manage size, we supply a mock response that contains _only_ what the app will need. This does mean
            // that we need to revise the mock response if our app starts using more (or different) data.
            request.respondWith({
                status: 200,
                responseText: JSON.stringify({
                    data: [{
                        source_tld: "tumblr.com",
                        images: {
                            fixed_width: {
                                url: "http://media2.giphy.com/media/FiGiRei2ICzzG/200w.gif"
                            }
                        }
                    }]
                })
            });

            expect($(".image-result-container").children().length).toBe(1);
            // We can go even further by examining the resulting element(s) and expecting their content to match the
            // mock response, but we will leave this as "further work" for now.
        });
    });
});

