class AgeGroupsController < ApplicationController
  before_action :set_age_group, only: [:show, :edit, :update, :destroy]

  # GET /age_groups
  # GET /age_groups.json
  def index
    @age_groups = AgeGroup.all
  end

  # GET /age_groups/1
  # GET /age_groups/1.json
  def show
  end

  # GET /age_groups/new
  def new
    @age_group = AgeGroup.new
  end

  # GET /age_groups/1/edit
  def edit
  end

  # POST /age_groups
  # POST /age_groups.json
  def create
    @age_group = AgeGroup.new(age_group_params)

    respond_to do |format|
      if @age_group.save
        format.html { redirect_to @age_group, notice: 'Age group was successfully created.' }
        format.json { render :show, status: :created, location: @age_group }
      else
        format.html { render :new }
        format.json { render json: @age_group.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /age_groups/1
  # PATCH/PUT /age_groups/1.json
  def update
    respond_to do |format|
      if @age_group.update(age_group_params)
        format.html { redirect_to @age_group, notice: 'Age group was successfully updated.' }
        format.json { render :show, status: :ok, location: @age_group }
      else
        format.html { render :edit }
        format.json { render json: @age_group.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /age_groups/1
  # DELETE /age_groups/1.json
  def destroy
    @age_group.destroy
    respond_to do |format|
      format.html { redirect_to age_groups_url, notice: 'Age group was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_age_group
      @age_group = AgeGroup.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def age_group_params
      params[:age_group]
    end
end
