ActiveAdmin.register Gift do


  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #

  permit_params :name, :gender, :price, :site, :description, :photo, :ageGroup_id, category_ids: []

  action_item only: :index do
    link_to 'Quick add', admin_gift_quick_add_path, class: 'fancybox', data: { 'fancybox-type' => 'ajax' }
  end

  controller do
    def quick_add
      @gift = Gift.new
      render layout: false
    end

    def quick_create
      @gift = Gift.new(permitted_params[:gift])
      @gift.save
      render 'quick_response', layout: false
    end
  end

  # index do
  #   column :name
  #       column "Categories" do |gift|
  #     (gift.categories.map{ |p| p.name }).join(', ').html_safe
  #   end
  #   column :gender
  #   column :price
  #   column :site
  #   column :description
  #   column "Age Group" do |gift|
  #     gift.ageGroup.description unless gift.ageGroup.nil?  
  #   end
  #   column "Image" do |gift|
  #     link_to(image_tag(gift.photo.url(:thumb), :height => '100'), admin_gift_path(gift))
  #   end
  #   column :created_at
  #   column :updated_at
  #   actions
  # end

  show do |ad|
    attributes_table do
      row :name
      row :gender
      row "Categories" do |gift|
        (gift.categories.map{ |p| p.name }).join(', ').html_safe
      end
      row :price
      row :site
      row :description
      row "Age Group" do |gift|
        gift.ageGroup.description unless gift.ageGroup.nil?  
      end
      row :created_at
      row :updated_at
      row "Image" do |gift|
        link_to(image_tag(gift.photo.url(:medium)), admin_gift_path(gift))
      end
    end
  end

  form :html => { :enctype => "multipart/form-data" } do |f|
    f.semantic_errors *f.object.errors.keys
    inputs 'Details', :multipart => true do
      input :name
      input :gender,
        :as => :select,
        :collection => ['M', 'F', 'U']
      input :price
      input :site, :input_html => { :rows => 1 }
      input :description
      input :ageGroup, :as => :select, :collection => AgeGroup.all.map {|u| [u.description, u.id]}, :include_blank => false
      input :categories, 
        :as => :select, 
        :collection => Category.order(:name), :input_html => { :size => 50 }
      f.input :photo, :as => :file, :hint => f.template.image_tag(f.object.photo.url(:medium))
      li "Created at #{f.object.created_at}" unless f.object.new_record?
      #input :category
    end
    para "Press cancel to return to the list without saving."
    actions
  end

  # form do |f|
  #     f.inputs t('user.details') do
  #     f.input :title
  #     f.input :description
  #     f.inputs do
  #       f.has_many :questions do |p|
  #          p.input :title
  #          p.input :description
  #          p.has_many :question_selections do |q|
  #            q.input :label
  #            q.input :text
  #          end  
  #         p.input :question_type, as: :select, collection: Question::QUESTION_TYPES
  #         p.input :obligatory
  #         p.input :is_shown_in_report
  #         p.input :_destroy, as: :boolean, required: false, label: t('remove')
  #       end
  #       if params[:id]
  #         f.input :is_finished
  #       end
  #     end
  #  end
  #   f.actions
  # end
  #
  # or
  #
  # permit_params do
  #   permitted = [:permitted, :attributes]
  #   permitted << :other if resource.something?
  #   permitted
  # end


end
