ActiveAdmin.register Gift do


  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  permit_params :name, :price, :site, :description, category_ids: []

  index do
    column :name
        column "Categories" do |gift|
      (gift.categories.map{ |p| p.name }).join(', ').html_safe
    end
    column :price
    column :site
    column :description
    column :created_at
    column :updated_at
    actions
  end

  show do |ad|
    attributes_table do
      row :name
      row "Categories" do |gift|
        (gift.categories.map{ |p| p.name }).join(', ').html_safe
      end
      row :price
      row :site
      row :description
      row :created_at
      row :updated_at
    end
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    inputs 'Details' do
      input :name
      input :price
      input :description
      input :categories, 
        :as => :select, 
        :collection => Category.order(:name), :input_html => { :size => 50 }
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
