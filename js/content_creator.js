function createPortfolioItems(data) {

  data.forEach(function(item) {
    var portfolio_item = $('<div class="col-sm-4 portfolio-item"></div>');
    var modal_link = $('<a class="portfolio-link" data-toggle="modal"></a>'); //TODO: need a way to link item to modal in href
    var caption = $('<div class="caption"></div>');
    var caption_content = $('<div class="caption-content"></div>');
    var caption_icon = $('<i class="fa fa-search-plus fa-3x"</i>');
    var img = $('<img class="img-responsive"></img>'); //TODO add alt title to cms

    modal_link.attr("href", "#" + item.sys.id);
    img.attr("src", item.fields.screenShot.fields.file.url); //TODO: R&D media api
    img.attr("alt", item.fields.screenShot.fields.title);

    caption_content.append(caption_icon);
    caption.append(caption_content);
    modal_link.append(caption);
    modal_link.append(img);
    portfolio_item.append(modal_link);
    

    $("#portfolioItems").append(portfolio_item);

  })
}

function createPortfolioModals(data) {
  data.forEach(function(item) {
    var modal = $('<div class="portfolio-modal modal fade" tabindex="-1" role="dialog" aria-hidden="true"></div>');
    var modal_content = $('<div class="modal-content"></div>');
    
    var container = $('<div class="container"></div>');
    var row = $('<div class="row"></div>');
    var col = $('<div class="col-lg-8 col-lg-offset-2"></div>');
    var modal_body = $('<div class="modal-body"></div>');
    var heading = $('<h2></h2>');
    var hr = $('<hr class="star-primary">');
    var img = $('<img class="img-responsive img-centered">');
    var paragraph = $('<p></p>');
    var list = $('<ul class="list-inline item-details"></ul>');
    var client_list_item = $('<li>Client:&nbsp;</li>');
    var client_strong = $('<strong></strong>');
    var client_link = $('<a></a>'); //TODO surround with strong tags
    var date_list_item = $('<li>Date:&nbsp;</li>');
    var date_strong = $('<strong></strong>');
    var links_list_item = $('<li>Links:&nbsp;</li>');
    var links_website_strong = $('<strong></strong>');
    var links_sourceCode_strong = $('<strong></strong>');
    var website_link = $('<a>Website</a>');
    var sourceCode_link = $('<a>Source Code</a>');
    var linksSeparator = $('<span>; </span>');
    var closeButton = $('<button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>');

    modal.attr("id", item.sys.id)
    heading.html(item.fields.title);
    img.attr("src", item.fields.screenShot.fields.file.url);
    img.attr("alt", item.fields.screenShot.fields.title);
    paragraph.html(item.fields.details);
    client_link.attr("href", item.fields.clientLink);
    client_link.html(item.fields.client);
    date_strong.html(item.fields.date);
    website_link.attr("href", item.fields.siteLink);
    sourceCode_link.attr("href", item.fields.sourceCodeLink);

    client_strong.html(client_link);
    links_website_strong.html(website_link);
    links_sourceCode_strong.html(sourceCode_link);

    client_list_item.append(client_strong);
    date_list_item.append(date_strong);
    links_list_item.append(links_website_strong, linksSeparator, links_sourceCode_strong);

    list.append(client_list_item, date_list_item, links_list_item);


    modal_body.append(heading, hr, img, paragraph, list, closeButton);
    col.append(modal_body);
    row.append(col);
    container.append(row);

    modal_content.append('<div class="close-modal" data-dismiss="modal"><div class="lr"><div class="rl"></div></div></div>');
    modal_content.append(container);

    modal.append(modal_content);

    $("#portfolio-modals").append(modal);
  })



}

function getContentfulData() {
  var SPACE_ID = '3grrx3905eye';
  var ACCESS_TOKEN = '394cdb0185976eea27bdd2c887d8d9c54e7e65533ec76959c34c3cd7a0a11670';
  var client = contentful.createClient({
    space: '3grrx3905eye',
    accessToken: '394cdb0185976eea27bdd2c887d8d9c54e7e65533ec76959c34c3cd7a0a11670'
  });

  client.getEntries({
    'content_type': 'project'
  }).then(function(entries) {
    console.log(entries.items);
    createPortfolioItems(entries.items);
    createPortfolioModals(entries.items);
  })
}