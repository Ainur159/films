import { autobind } from "core-decorators";
import React from "react";
import { GENRES } from "../../utils/utils";
import { Button } from "../controls/Button/Button";
import { Label } from "../controls/Label/Label";
import { Modal } from "../controls/Modal/Modal";
import { SelectControl } from "../controls/SelectControl/SelectControl";
import { TextControl } from "../controls/TextControl/TextControl";
import ReactStars from "react-stars";
import { FileUploader } from "../controls/FileUploader/FileUploader";
import "./Content.less";
import classNames from "classnames";

export interface ContentProps {}

export interface ObjectModalValues {
  id?: number;
  name?: string;
  genre?: string[];
  rating?: number;
  images?: string[];
}

export interface ContentState {
  mode: "new" | "edit";
  objectModalOpen: boolean;
  objectModalValues: ObjectModalValues;
  films: ObjectModalValues[];
  filters: FilterVals;
  filterModalOpen: boolean;
  searchValue: string;
  page: number;
}

export interface FilterVals {
  genre?: string[];
  lowerRating?: number;
}

export let CURR_ID = 1;
export const COUNT_IN_PAGE = 20;

export class Content extends React.Component<ContentProps, ContentState> {
  loadFileRef?: HTMLInputElement;

  constructor(props: ContentProps) {
    super(props);
    this.state = {
      mode: "new",
      objectModalOpen: false,
      objectModalValues: {},
      films: [],
      filters: {},
      filterModalOpen: false,
      searchValue: "",
      page: 0,
    };
  }

  @autobind
  createClick() {
    this.setState({ objectModalOpen: true, mode: "new" });
  }

  @autobind
  objectModalClose() {
    this.setState({ objectModalOpen: false });
  }

  @autobind
  objectModalOk() {
    if (this.state.mode === "new") {
      const newVals = [{ ...this.state.objectModalValues, id: CURR_ID++ }];
      this.setState({ films: this.state.films.concat(newVals) });
    } else {
      const films = this.state.films;
      const index = films.findIndex(
        (el) => el.id === this.state.objectModalValues.id
      );
      films[index] = { ...films[index], ...this.state.objectModalValues };
      this.setState({ mode: "new", films, objectModalValues: {} });
    }
    this.objectModalClose();
  }

  @autobind
  changeObject(id?: number) {
    if (id) {
      let vals = this.state.films.find((el) => el.id === id);
      this.setState({
        mode: "edit",
        objectModalValues: { ...vals },
        objectModalOpen: true,
      });
    }
  }

  @autobind
  changeObjectModalValue(option: keyof ObjectModalValues, value: any) {
    const { objectModalValues } = this.state;
    this.setState({
      objectModalValues: { ...objectModalValues, ...{ [option]: value } },
    });
  }

  objectModal() {
    const { objectModalOpen, objectModalValues } = this.state;
    const customButtons = [
      <Button key="cancel-btn" onClick={this.objectModalClose}>
        Отмена
      </Button>,
      <Button key="ok-btn" primary={true} onClick={this.objectModalOk}>
        ОК
      </Button>,
    ];
    return objectModalOpen ? (
      <Modal
        onClose={this.objectModalClose}
        header={
          (objectModalValues.id && objectModalValues.name) || "Новый объект"
        }
        customButtons={customButtons}
      >
        <div className="">
          <Label>{"Наименование"}</Label>
          <TextControl
            value={objectModalValues.name}
            onChange={(value) => this.changeObjectModalValue("name", value)}
          />
        </div>
        <div className="mt-1">
          <Label>{"Жанр"}</Label>
          <SelectControl
            placeholder="Выберите жанр"
            options={GENRES}
            value={objectModalValues.genre}
            onChange={(value) => this.changeObjectModalValue("genre", value)}
            multiple={true}
            size={7}
          />
        </div>
        <div className="mt-1">
          <Label className="mb-0">{"Рейтинг"}</Label>
          <ReactStars
            count={5}
            value={objectModalValues.rating}
            onChange={(value: number) =>
              this.changeObjectModalValue("rating", value)
            }
            size={32}
            color2={"#ffd700"}
          />
        </div>
        <div className="mt-1">
          <Label>{"Картинки"}</Label>
          <FileUploader
            value={objectModalValues.images}
            onChange={(value) => this.changeObjectModalValue("images", value)}
          />
        </div>
      </Modal>
    ) : null;
  }

  @autobind
  saveClick() {
    const data = JSON.stringify(this.state.films);
    // localStorage.setItem("films", data);
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "films.json";
    link.href = url;
    link.click();
    link.remove();
  }

  @autobind
  loadClick(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // const data = localStorage.getItem("films");
    // const films: ObjectModalValues[] = (data && JSON.parse(data)) || [];
    // this.setState({ films });
    this.loadFileRef && $(this.loadFileRef).trigger("click");
    e?.stopPropagation();
  }

  @autobind
  loadInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = String(e.target?.result);
        const films: ObjectModalValues[] = (data && JSON.parse(data)) || [];

        films.forEach((el) => {
          if (!el.images?.length && el.name) {
            el.images = [`${el.name.toLowerCase().trim()}.jpg`];
          }
        });

        CURR_ID = Math.max(...films.map((el) => el.id || 1)) + 1;

        this.setState({ films });
      };
      reader.readAsText(e.target.files[0]);
    }
  }

  @autobind
  filterClick() {
    this.setState({ filterModalOpen: true });
  }

  @autobind
  filterOptionChange(option: keyof FilterVals, value: any) {
    const { filters } = this.state;
    this.setState({
      filters: { ...filters, ...{ [option]: value } },
    });
  }

  @autobind
  filterOk() {
    this.filterClose();
  }

  @autobind
  filterClose() {
    this.setState({ filterModalOpen: false });
  }

  @autobind
  clearFilters() {
    this.setState({ filters: {} });
  }

  filterModal() {
    const { filterModalOpen, filters } = this.state;
    const customButtons = [
      <Button onClick={this.clearFilters}>Очистить</Button>,
    ];
    return filterModalOpen ? (
      <Modal
        onClose={this.filterClose}
        header="Фильтры"
        customButtons={customButtons}
      >
        <div className="mt">
          <Label>{"Жанр"}</Label>
          <SelectControl
            placeholder="Выберите жанр"
            options={GENRES}
            value={filters.genre}
            onChange={(value) => this.filterOptionChange("genre", value)}
            multiple={true}
          />
        </div>
        <div className="mt-1">
          <Label className="mb-0">{"Рейтинг"}</Label>
          <ReactStars
            count={5}
            value={filters.lowerRating}
            onChange={(value: number) =>
              this.filterOptionChange("lowerRating", value)
            }
            size={32}
            color2={"#ffd700"}
          />
        </div>
      </Modal>
    ) : null;
  }

  @autobind
  searchChange(value?: string) {
    this.setState({ searchValue: value || "", page: 0 });
  }

  @autobind
  moveSlide(page: number) {
    this.setState({ page });
  }

  get pagesCount(): number {
    const films = this.state.films || [];
    return Math.round(films.length / COUNT_IN_PAGE);
  }

  slidePoints(films: ObjectModalValues[]) {
    if (!films.length) {
      return null;
    }
    const arr = new Array(this.pagesCount).fill(0);
    if (arr.length < 2) {
      return null;
    }
    return (
      <div className="slider-points-footer d-flex justify-content-center p-3">
        {(arr || []).map((item, index) => {
          return (
            <div
              key={index}
              className={classNames(
                "slider-points-footer-item",
                (index === this.state.page && "bg-primary") || "bg-secondary"
              )}
              onClick={() => this.moveSlide(index)}
            />
          );
        })}
      </div>
    );
  }

  get pageFilms(): ObjectModalValues[] {
    const { films = [], filters, searchValue } = this.state;
    const start = this.state.page * COUNT_IN_PAGE;
    const end = start + COUNT_IN_PAGE;
    const flms = this.state.films.filter(
      (el) =>
        (!filters.genre || (el.genre && el.genre === filters.genre)) &&
        (!filters.lowerRating ||
          (el.rating && el.rating >= filters.lowerRating)) &&
        (!searchValue || el.name?.includes(searchValue))
    );
    return flms.slice(start, Math.min(end, flms.length));
  }

  render() {
    const { films, filters, searchValue, page } = this.state;
    return (
      <div className="content">
        <article className="d-flex flex-row align-items-center border-bottom py-2 position-relative">
          <Button
            primary={true}
            withoutBack={true}
            onClick={this.createClick}
            asCircle={true}
            className={"ms-3"}
            withoutBorder={true}
          >
            <i className="bi bi-plus-lg"></i>
          </Button>
          <Button
            primary={true}
            withoutBack={true}
            onClick={this.filterClick}
            asCircle={true}
            className={"ms-3"}
            withoutBorder={true}
          >
            <i className="bi bi-filter"></i>
          </Button>
          <Button
            primary={true}
            withoutBack={true}
            onClick={this.saveClick}
            asCircle={true}
            className={"ms-3"}
            withoutBorder={true}
          >
            <i className="bi bi-folder-plus"></i>
          </Button>
          <Button
            primary={true}
            withoutBack={true}
            onClick={this.loadClick}
            asCircle={true}
            className={"ms-3"}
            withoutBorder={true}
          >
            <i className="bi bi-cloud-arrow-down"></i>
            <input
              multiple={true}
              style={{ width: 0, height: 0 }}
              ref={(ref) => ref && (this.loadFileRef = ref)}
              type={"file"}
              name="files[]"
              onChange={this.loadInputChange}
            />
          </Button>
          <TextControl
            style={{ right: 10, maxWidth: 150 }}
            placeholder="Поиск"
            value={searchValue}
            onChange={this.searchChange}
            className="position-absolute"
          />
        </article>
        <article className="cards d-flex align-items-start flex-wrap justify-content-around m-3">
          {this.pageFilms.map((el) => {
            return (
              <div className="card" style={{ width: 300 }}>
                {(el.images?.length && (
                  <img
                    style={{ height: 200, width: 300 }}
                    src={`images/${el.images[0]}`}
                    className="card-img-top"
                    alt={el.name}
                  />
                )) ||
                  null}
                <div className="card-body">
                  <h5 className="card-title mb-0">{el.name}</h5>
                  <p className="card-text mb-0">
                    <Label>
                      <b>Жанр:</b>&nbsp;
                      {GENRES.find((g) => el.genre?.includes(g.value))?.name}
                    </Label>
                    <br />
                    <Label className="mb-0">{"Рейтинг"}</Label>
                    <ReactStars
                      count={5}
                      value={el.rating}
                      size={32}
                      color2={"#ffd700"}
                      edit={false}
                    />
                  </p>
                  <Button
                    primary={true}
                    onClick={() => this.changeObject(el.id)}
                  >
                    {"Изменить"}
                  </Button>
                </div>
              </div>
            );
          })}
        </article>
        {this.pagesCount > 1 && page > 0 && (
          <div
            className="page-arrow left"
            onClick={() => this.moveSlide(page - 1)}
          >
            <i className="bi bi-chevron-left"></i>
          </div>
        )}
        {this.pagesCount > 1 && page < this.pagesCount - 1 && (
          <div
            className="page-arrow right"
            onClick={() => this.moveSlide(page + 1)}
          >
            <i className="bi bi-chevron-right"></i>
          </div>
        )}
        <article>{this.slidePoints(films)}</article>
        {this.objectModal()}
        {this.filterModal()}
      </div>
    );
  }
}
