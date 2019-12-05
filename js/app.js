'use strict';

function Horn (img_url, title, description, keyword, horn) {
    this.img_url = img_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horn = horn;
}

Horn.prototype.renderWithJquery = function() {
    $('#photo-template').append(`
    <div>
        <h2> ${this.title}</h2>
        <img src="${this.img_url}" />
    </div>
    `);
};

Horn.prototype.renderKeywordImages = function() {
    
    $('#keywords').on('click', function(){
        let selectedItem = $('#keywords').val();
        console.log(1);
        if(selectedItem === this.keyword) {
            this.renderWithJquery();
        }
    })

}



Horn.prototype.renderWithJqueryClone = function () {
    let clone = $('#photo-template').clone();

    clone.find('h2').text(this.title);
    clone.find('img').attr('src', this.img_url);
    // clone.removeAttr('id');

    $('#horns').append(clone);
};

Horn.prototype.renderOptions = function() {
    $('#keywords').append(`
    <option value=${this.keyword} > ${this.keyword}</option>
    `)
    console.log('key',this.keyword);
}

$.get('data/page-1.json').then(
    (data) => {
        console.log(data);
        data.forEach(objFromJsonFile => {
            let horn = new Horn(objFromJsonFile.image_url, objFromJsonFile.title,objFromJsonFile.description, objFromJsonFile.keyword, objFromJsonFile.horn);
            console.log(objFromJsonFile.img_url);
            console.log(objFromJsonFile.title);
            horn.renderWithJqueryClone();
            horn.renderOptions();
            horn.renderKeywordImages();
        });
    });



