/* global $ confirm */

$(function () {

	"use strict";

	var foodTruckOptions = [];
	var foodTypes = [];

	$.get("/trucks", function (data) {
		var list = [];

		if (data && Array.isArray(data)) {
			data.forEach(function (truck) {
				foodTruckOptions.push("<option value=\"" + truck.name + "\">" + truck.name + "</option>");
				list.push("<li><li><span class=\"delete_link\" data-truck=\"" + truck.name + "\">X</span><a href=\"/trucks/" + truck.name + "\">" + truck.name + "</a></li>");
			});
			$(".trucks-list").append(list);
		}
	});

	$("form").on("submit", function (e) {
		e.preventDefault();
		var $form = $(this);

		// serialize will transform our form data into urlencoded notation
		var truckData = $form.serialize();

		if ($("input[type=radio][name=update]").value === "new") {
			$.ajax({
				method: "POST",
				url: "/trucks",
				data: truckData
			})
			.done(function (truck) {
				foodTruckOptions.push("<option value=\"" + truck.name + "\">" + truck.name + "</option>");
				$(".trucks-list").append("<li><span class=\"delete_link\" data-truck=\"" + truck.name + "\">X</span><a href=\"/trucks/" + truck.name + "\">" + truck.name + "</a></li>");
				$form.trigger("reset");
			});
		} else if ($("input[type=radio][name=update]").value === "edit") {
			$.ajax({
				method: "PUT",
				url: "/trucks/" + truckData.name,
				data: truckData
			})
			.done(function (_truck) {
				// Don't add the truck to our truck-list list because it must already
				// be there (else we would not be here).  We do not allow the user to
				// change the truck name because we're using the truck name as a key.
				$form.trigger("reset");
			});
		}
	});

	function addFoodType(type) {
		foodTypes.push(type);
		$(".foodType-list").append("<li>" + type + "</li>");
		$("[name=type]").val("");
	}

	$("[name=type]").on("keypress", function (e) {
		if (e.which === 13) {
			e.preventDefault();
			addFoodType($(this).val());
		}
	});

	$("#addFoodType").on("click", function (_e) {
		var foodType = $("[name=type]").val();

		addFoodType(foodType);
	});

	$("#clearFoodTypes").on("click", function (_e) {
		$(".foodType-list").empty();
	});

	$("input[type=radio][name=update]").change(function() {
		if (this.value === "new") {
			$("#foodTruckHeader").text("Add Food Trucks:");
			$("#foodTruckLegend").text("New Food Truck:");
			$("input[type=text][name=name]").prop("readonly", false);
			$("#foodTruckChoices").hide();
			$("input[type=submit]").val("Add Food Truck");
		} else if (this.value === "edit") {
			$("#foodTruckHeader").text("Edit Food Trucks:");
			$("#foodTruckLegend").text("Edit Food Truck:");
			$("input[type=text][name=name]").prop("readonly", true);
			// Reset the food truck options list in case it has changed.
			$("#foodTruckChoices").empty();
			$("#foodTruckChoices").append(foodTruckOptions);
			$("#foodTruckChoices").show();
			$("input[type=submit]").val("Update Food Truck");
			$("#foodTruckChoices").trigger("change");
		}
	});

	$("#foodTruckChoices").change(function() {
		$.ajax({
			method: "GET",
			url: "/trucks/" + this.value
		})
		.done(function (truck) {
			// Clear existing form data.  form.reset() seems to work a little too well
			// in that none of the changes below show up.  Asynchronous?
			$(".foodType-list").empty();
			$("input[type=checkbox][name=payment]").each(function () {
				$(this).attr("checked", false);
			});
			$("input[type=checkbox][name=schedule]").each(function () {
				$(this).attr("checked", false);
			});

			// Populate the form with truck data.
			$("input[type=text][name=name]").val(truck.name);
			$("[name=description]").val(
				truck.hasOwnProperty("description") && truck.description ? truck.description : "");
			if (truck.hasOwnProperty("type") && truck.type) {
				truck.type.forEach(function (element) {
					addFoodType(element);
				});
			}
			if (truck.hasOwnProperty("payment") && truck.payment) {
				truck.payment.forEach(function (element) {
					var id = element[0].toLowerCase() + element.slice(1).replace(/ /g,"") + "Payment";

					$("#" + id).attr("checked", true);
				});
			}
			if (truck.hasOwnProperty("schedule") && truck.schedule) {
				truck.schedule.forEach(function (element) {
					$("#" + element).attr("checked", true);
				});
			}
			$("input[type=text][name=website]").val(
				truck.hasOwnProperty("website") && truck.website ? truck.website : "");
			$("input[type=text][name=Facebook]").val(
				truck.hasOwnProperty("Facebook") && truck.Facebook ? truck.Facebook : "");
			$("input[type=text][name=Twitter]").val(
				truck.hasOwnProperty("Twitter") && truck.Twitter ? truck.Twitter : "");
		});
	});

	$(".trucks-list").on("click", "[data-truck]", function (e) {
		if (!confirm("Remove food truck?")) {
			return false;
		}
		var $target = $(e.currentTarget);

		$.ajax({
			method: "DELETE",
			url: "/trucks/" + $target.data("truck")
		})
		.done(function () {
			$target.closest("li").remove();
		});
	});
});
