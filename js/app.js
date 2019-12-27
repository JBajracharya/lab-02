'use strict';

const options = [];

function Horn(img_url, title, description, keyword, horn) {
	this.img_url = img_url;
	this.title = title;
	this.description = description;
	this.keyword = keyword;
	this.horn = horn;
}

Horn.prototype.renderWithJquery = function () {
	$('#photo-template').append(`
    <div>
        <h2> ${this.title}</h2>
        <img src="${this.img_url}" />
    </div>
    `);
};

Horn.prototype.renderWithJqueryClone = function () {
	let clone = $('#photo-template').clone();

	clone.find('h2').text(this.title);
	clone.find('img').attr('src', this.img_url);
	clone.attr('class', `${this.keyword}`);
	$('#horns').append(clone);
};

Horn.prototype.renderOptions = function () {
	if (!options.includes(this.keyword)) {
		options.push(this.keyword);
		$('#keywords').append(`
        <option value=${this.keyword} > ${this.keyword}</option>
        `);
	}
};

$.get('data/page-1.json').then((data) => {
	data.forEach((objFromJsonFile) => {
		let horn = new Horn(
			objFromJsonFile.image_url,
			objFromJsonFile.title,
			objFromJsonFile.description,
			objFromJsonFile.keyword,
			objFromJsonFile.horn
		);
		horn.renderWithJqueryClone();
		horn.renderOptions();
	});
	$('section').show();
	$(`section:first-child`).hide();
});

$('#keywords').on('change', function () {
	
	let selectedItem = $('option:selected').val();
	if(selectedItem !== 'default'){
		$('section').hide();
		$(`section[class = "${selectedItem}"]`).show();
	}else{
		$('section').show();
	}
});
